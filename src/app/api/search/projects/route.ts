import { Collaborators } from '@/schemas/collaboratorsSchema';
import repositoryGraphQL from '@/schemas/graphQL/repositoryGraphQL';
import { PagedProjectsSchema } from '@/schemas/pagedProjectsSchema';
import { ProjectSchema } from '@/schemas/projectSchema';
import { createOctokitClient } from '@/utils/database/github';
import { handleGraphQLReponseError } from '@/utils/misc';
import { NextRequest, NextResponse } from 'next/server';

// TODO: Add types to this route.

/**
 * @param name The name of the projects you are searching for
 * @param perpage The number of projects you want to fetch. Default is `10`, max is `100`
 * @param tags The tags the projects should have
 * @param sort The variable to sort after. Must be `name`, `watchers`, `updated`. Default is `updated`.
 * @param ascending Wether the projects should ascending or descending based of the sort value. Is boolean, default is `true`
 * @param pagecursor The cusor of the page you want to fetch.
 * @param languages The languages the projects should use
 *
 * @returns project or error
 */
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
    const pageCursor = searchParams.get('pagecursor'); // Not a number, has to be provided cursor

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
          repositoryCount
          repos: edges {
            repo: node {
              ... on Repository {
                ${repositoryGraphQL}
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
      const { errorMessage, status } = handleGraphQLReponseError(error);
      return NextResponse.json({ error: errorMessage }, { status: status });
    }

    // Format the data to be easily readable
    const projectsData: PagedProjectsSchema = {
      totalCount: queryData.search.repositoryCount,
      projects: queryData.search.repos.map((repo): ProjectSchema => {
        return {
          id: repo.repo.id,
          name: repo.repo.name,
          url: repo.repo.url,
          description: repo.repo.description,
          createdAt: repo.repo.createdAt,
          updatedAt: repo.repo.updatedAt,
          watchers: {
            totalCount: repo.repo.watchers.totalCount,
            users: repo.repo.watchers.users.map((user) => user.user),
            pageInfo: repo.repo.watchers.pageInfo,
          },
          collaborators: {
            totalCount: repo.repo.collaborators.totalCount,
            users: repo.repo.collaborators.users.map((user) => user.user),
            pageInfo: repo.repo.collaborators.pageInfo,
          },
          tags: {
            totalCount: repo.repo.repositoryTopics.totalCount,
            tags: repo.repo.repositoryTopics.topics.map((topic) => topic.node.topic.name),
            pageInfo: repo.repo.repositoryTopics.pageInfo,
          },
          languages: repo.repo.languages.languages.map((lang) => lang.name),
          commits: {
            totalCount: repo.repo.defaultBranchRef.target.history.totalCount,
            commits: repo.repo.defaultBranchRef.target.history.commits.map(
              (commit) => commit.commit
            ),
            pageInfo: repo.repo.defaultBranchRef.target.history.pageInfo,
          },
        };
      }),
      pageInfo: queryData.search.pageInfo,
    };

    //Return the data
    return NextResponse.json({ data: projectsData }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
