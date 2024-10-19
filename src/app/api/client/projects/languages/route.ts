import { createOctokitClient } from '@/utils/database/github';
import { handleGraphQLReponseError } from '@/utils/misc';
import { NextResponse } from 'next/server';

// TODO: Add states to this route.
// TODO: Reduce time

// This api route fetches all coding lanugages from all repositories and sorts out all the ones that are not unique
export async function GET() {
  try {
    // Using set as it only allows unique entries
    const languageSet = new Set<String>();

    // Creating Octokit client
    const octoClient = createOctokitClient();

    // Query to fetch repositories with their languages
    const repoQuery = `
      query getRepos($repoOwner: String!, $cursor: String) {
        search(query: $repoOwner, type: REPOSITORY, first: 100, after: $cursor) {
          edges {
            node {
              ... on Repository {
                name
                languages(first: 100) {
                  edges {
                    node {
                      name
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    // Is true until there are no more pages
    let hasMoreRepos = true;
    let repoCursor = null; // Cursor to the next page. Null if there is no next page.

    // Loop to fetch all repositories
    while (hasMoreRepos) {
      let repoData: any;
      try {
        repoData = await octoClient.graphql(repoQuery, {
          repoOwner: `user:${process.env.GITHUB_USERNAME}`,
          cursor: repoCursor,
        });
      } catch (error: any) {
        return handleGraphQLReponseError(error);
      }

      // Loop through repositories and get their languages
      for (const repoEdge of repoData.search.edges) {
        const repo = repoEdge.node;

        let hasMoreLanguages = true;
        let languageCursor = null;

        // Loop to fetch languages in the current repository
        while (hasMoreLanguages) {
          const languageQuery = `
            query getRepoLanguages($repoOwner: String!, $repoName: String!, $languageCursor: String) {
              repository(owner: $repoOwner, name: $repoName) {
                languages(first: 100, after: $languageCursor) {
                  edges {
                    node {
                      name
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          `;

          let languageData: any;
          try {
            languageData = await octoClient.graphql(languageQuery, {
              repoOwner: process.env.GITHUB_USERNAME,
              repoName: repo.name,
              languageCursor: languageCursor,
            });
          } catch (error: any) {
            return handleGraphQLReponseError(error);
          }

          // Add languages to languageSet
          if (languageData.repository.languages && languageData.repository.languages.edges) {
            languageData.repository.languages.edges.forEach((languageEdge: any) => {
              languageSet.add(languageEdge.node.name); // Corrected to use `name`
            });
          }

          // Update pagination state for languages
          hasMoreLanguages = languageData.repository.languages.pageInfo.hasNextPage;
          languageCursor = languageData.repository.languages.pageInfo.endCursor;
        }
      }

      // Update pagination state for repositories
      hasMoreRepos = repoData.search.pageInfo.hasNextPage;
      repoCursor = repoData.search.pageInfo.endCursor;
    }

    // Convert the set to an array of unique languages
    const uniqueLanguages = Array.from(languageSet);

    // Return languages to the client
    return NextResponse.json({ data: uniqueLanguages }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return a generic error
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
