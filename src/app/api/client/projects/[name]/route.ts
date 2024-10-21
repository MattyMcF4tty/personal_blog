import { createOctokitClient } from '@/utils/database/github';
import { handleGraphQLReponseError } from '@/utils/misc';
import { NextResponse } from 'next/server';

export async function GET(req: NextResponse, { params }: { params: { name: string } }) {
  try {
    const projectName = params.name;

    const octoClient = createOctokitClient();

    const query = `
      query getRepo ($repoOwner: String!, $repoName: String!) {
        repository (owner: $repoOwner, name: $repoName) {
          id
          name
          url
          description
          createdAt
          updatedAt
          watchers (first: 0) {
            totalCount
            users: edges {
              user: node {
                name
                avatarUrl
                url
              }
            }
          }
          repositoryTopics (first: 0) {
            totalCount
            topics: nodes {
              topic {
                name
              }
            }
          }
          languages (first: 0) {
            languages: nodes {
              name
            }
          }
        }
      }`;

    let queryData: any;
    try {
      queryData = await octoClient.graphql(query, {
        repoOwner: `${process.env.GITHUB_USERNAME}`,
        repoName: projectName,
      });
    } catch (error: any) {
      const { errorMessage, status } = handleGraphQLReponseError(error);
      return NextResponse.json({ error: errorMessage }, { status: status });
    }

    const repoData = {
      id: queryData.repository.id,
      name: queryData.repository.name,
      url: queryData.repository.url,
      description: queryData.repository.description,
      createdAt: queryData.repository.createdAt,
      updatedAt: queryData.repository.updatedAt,
      watchers: {
        totalCount: queryData.repository.watchers.totalCount,
        users: queryData.repository.watchers.users,
      },
      tags: {
        totalCount: queryData.repository.repositoryTopics.totalCount,
        tags: queryData.repository.repositoryTopics.topics.map((topic) => topic.topic.name),
      },
      languages: queryData.repository.languages.languages.map((language) => language.name),
    };

    return NextResponse.json({ data: repoData }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
