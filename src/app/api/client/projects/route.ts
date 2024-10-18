import { createOctokitClient } from '@/utils/database/github';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get query parameters from request
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get('name');
    const tags = searchParams.getAll('tags'); // GitHub calls them topics
    const languages = searchParams.getAll('languages');
    const ascending = searchParams.get('ascending') !== 'false' ? 'asc' : 'desc';
    const sort = searchParams.get('sort') || 'updated';
    const perPage = Math.min(100, Math.max(1, Number(searchParams.get('perPage')) || 10));
    const page = searchParams.get('page');

    const octoClient = createOctokitClient();

    // Making it only possible to fetch from personal repositories
    let queryString = `user:${process.env.GITHUB_USERNAME} is:public`;

    // Apply name parameter to query
    if (name) {
      queryString += ` ${name} in:name`;
    }
    // Apply tags parameter to query
    tags.forEach((tag) => {
      queryString += ` topic:${tag}`;
    });
    languages.forEach((language) => {
      queryString += ` language:${language}`;
    });

    // Create the GraphQL query schema
    const query = `
      query searchRepos($queryString: String! $perPage: Int!) {
        search (query: $queryString, type: REPOSITORY, first: $perPage) {
          repos: edges {
            repo: node {
              ... on Repository {
                name
                id
                url
                description
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
        }
      }
    `;

    // Fetch the query
    const queryData: any = await octoClient.graphql(query, {
      queryString: queryString,
      perPage: perPage,
    });

    // Format the data to be easily readable
    const repoData = queryData.search.repos.map((repo) => {
      return {
        id: repo.repo.id,
        name: repo.repo.name,
        url: repo.repo.url,
        description: repo.repo.description,
        tags: repo.repo.repositoryTopics.topics.map((t) => t.topic.name),
        languages: repo.repo.languages.edges.map((lang) => lang.node.name),
      };
    });

    //Return the data
    return NextResponse.json({ data: repoData }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
