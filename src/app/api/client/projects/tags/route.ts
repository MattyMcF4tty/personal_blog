import { createOctokitClient } from '@/utils/database/github';
import { handleGraphQLReponseError } from '@/utils/misc';
import { NextResponse } from 'next/server';

// TODO: Add types to this route.
// TODO: Reduce time

// This api route fetches all tags from all repositories and sorts out all the ones that are not unique
export async function GET() {
  try {
    // Using set as it only allows unique intries
    const topicSet = new Set<String>();

    // Creating Octokit client
    const octoClient = createOctokitClient();

    // Query to fetch repositories with their topics
    const repoQuery = `
      query getRepos($repoOwner: String!, $cursor: String) {
        search(query: $repoOwner, type: REPOSITORY, first: 100, after: $cursor) {
          edges {
            node {
              ... on Repository {
                name
                repositoryTopics(first: 100) {
                  edges {
                    node {
                      topic {
                        name
                      }
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

    // Is true until there is no more pages
    let hasMoreRepos = true;
    // The cursor to the next page. Null if there is no next page. Is default null because we dont know yet. This is why we have `hasMoreRepos`
    let repoCursor = null;

    // As long as hasMoreRepos is true. We loop through and fetch all repositories.
    while (hasMoreRepos) {
      // Fetch Repos from Github and handle potential errors
      let repoData: any;
      try {
        repoData = await octoClient.graphql(repoQuery, {
          repoOwner: `user:${process.env.GITHUB_USERNAME}`,
          cursor: repoCursor,
        });
      } catch (error: any) {
        const { errorMessage, status } = handleGraphQLReponseError(error);
        return NextResponse.json({ error: errorMessage }, { status: status });
      }

      // Loop through repositories and get there their topics
      for (const repoEdge of repoData.search.edges) {
        const repo = repoEdge.node;

        // Is true until there is no more pages
        let hasMoreTopics = true;
        // The cursor to the next page. Null if there is no next page. Is default null because we dont know yet. This is why we have `hasMoreTopics`
        let topicCursor = null;

        // Will run until there is no more pages of topics in repository
        while (hasMoreTopics) {
          // Query to fetch current repository topics
          const topicQuery = `
            query getRepoTopics($repoOwner: String!, $repoName: String!, $topicCursor: String) {
              repository(owner: $repoOwner, name: $repoName) {
                repositoryTopics(first: 100, after: $topicCursor) {
                  edges {
                    node {
                      topic {
                        name
                      }
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

          // Fetch repository topics and handle potential errors
          let topicData: any;
          try {
            topicData = await octoClient.graphql(topicQuery, {
              repoOwner: process.env.GITHUB_USERNAME,
              repoName: repo.name,
              topicCursor: topicCursor,
            });
          } catch (error: any) {
            const { errorMessage, status } = handleGraphQLReponseError(error);
            return NextResponse.json({ error: errorMessage }, { status: status });
          }

          // Add topics to topicSet
          topicData.repository.repositoryTopics.edges.forEach((topicEdge: any) => {
            topicSet.add(topicEdge.node.topic.name);
          });

          // Update pagination state for topics
          hasMoreTopics = topicData.repository.repositoryTopics.pageInfo.hasNextPage;
          topicCursor = topicData.repository.repositoryTopics.pageInfo.endCursor;
        }
      }

      // Update pagination state for repositories
      hasMoreRepos = repoData.search.pageInfo.hasNextPage;
      repoCursor = repoData.search.pageInfo.endCursor;
    }

    // Convert the set to string array
    const uniqueTags = Array.from(topicSet);

    // Return tags to client
    return NextResponse.json({ data: uniqueTags }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
