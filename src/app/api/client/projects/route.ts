import { createOctokitClient } from '@/utils/database/github';
import { handleGraphQLReponseError } from '@/utils/misc';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters from request
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const tags = searchParams.getAll('tags'); // GitHub calls them topics
    const languages = searchParams.getAll('languages');
    const ascending = searchParams.get('ascending') !== 'false';
    const sort = searchParams.get('sort') || 'updated';
    const perPage = Math.min(100, Math.max(1, Number(searchParams.get('perpage')) || 10));
    const pageCursor = searchParams.get('page'); // Not a number, has to be provided cursor

    // Create Octokit client
    const octoClient = createOctokitClient();

    // Making it only possible to fetch from personal repositories
    let queryString = `user:${process.env.GITHUB_USERNAME} is:public`;

    // Validate and apply sort parameter to query
    if (['name', 'updated', 'watchers'].includes(sort)) {
      queryString += ` sort:${sort}-${ascending ? 'asc' : 'desc'}`;
    } else {
      return NextResponse.json({ error: `${sort} is not a valid sort option` }, { status: 400 });
    }

    // Apply name parameter to query
    if (name) {
      queryString += ` ${name} in:name`;
    }

    // Apply tags parameter to query
    tags.forEach((tag) => {
      queryString += ` topic:${tag}`;
    });

    // Apply languages parameter to query
    languages.forEach((language) => {
      queryString += ` language:${language}`;
    });

    // Create the GraphQL query schema
    const query = `
      query searchRepos($queryString: String! $perPage: Int!, $cursor: String) {
        search (query:$queryString, type:REPOSITORY, first:$perPage, after:$cursor) {
          repos: edges {
            repo: node {
              ... on Repository {
                name
                id
                url
                description
                watchers {
                  totalCount
                }
                updatedAt
                repositoryTopics (first: 10) {
                  topics: nodes {
                    topic {
                      name
                    }
                  }
                }
                languages (first: 10) {
                  edges {
                    node {
                      name
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }
    `;

    // Fetch the query and handle any errors that occur
    let queryData: any;
    try {
      queryData = await octoClient.graphql(query, {
        queryString: queryString,
        perPage: perPage,
        cursor: pageCursor,
      });
    } catch (error: any) {
      return handleGraphQLReponseError(error);
    }

    // Format the data to be easily readable
    const repoData = {
      repos: queryData.search.repos.map((repo) => {
        return {
          id: repo.repo.id,
          name: repo.repo.name,
          url: repo.repo.url,
          description: repo.repo.description,
          watchers: repo.repo.watchers.totalCount,
          updated: repo.repo.updatedAt,
          tags: repo.repo.repositoryTopics.topics.map((topic) => topic.topic.name),
          languages: repo.repo.languages.edges.map((lang) => lang.node.name),
        };
      }),
      nextPage: queryData.search.pageInfo.hasNextPage ? queryData.search.pageInfo.endCursor : null,
      previousPage: queryData.search.pageInfo.hasPreviousPage
        ? queryData.search.pageInfo.startCursor
        : null,
    };

    //Return the data
    return NextResponse.json({ data: repoData }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
