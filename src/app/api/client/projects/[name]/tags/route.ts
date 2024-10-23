import { TagsSchema } from '@/schemas/tagsSchema';
import { createOctokitClient } from '@/utils/database/github';
import { handleGraphQLReponseError } from '@/utils/misc';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  try {
    // Get query paramters from url
    const searchParams = req.nextUrl.searchParams;
    const pageCursor = searchParams.get('cursor');
    const projectName = params.name;

    // Create Octokit client
    const octoClient = createOctokitClient();

    // create GraphQL query string
    const query = `
  query getRepoCollaborators ($repoOwner: String!, $repoName: String! $pageCursor: String) {
    repository (owner: $repoOwner, name: $repoName) {
      repositoryTopics (first: 10, after: $pageCursor) {
        totalCount
        topics: edges {
          node {
            topic {
              name
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
  }`;

    let queryData: any;
    try {
      queryData = await octoClient.graphql(query, {
        repoOwner: process.env.GITHUB_USERNAME,
        repoName: projectName,
        pageCursor: pageCursor,
      });
    } catch (error: any) {
      const { errorMessage, status } = handleGraphQLReponseError(error);
      return NextResponse.json({ error: errorMessage }, { status: status });
    }

    const tags: TagsSchema = {
      totalCount: queryData.repository.repositoryTopics.totalCount,
      tags: queryData.repository.repositoryTopics.topics.map((topic) => topic.node.topic.name),
      pageInfo: queryData.repository.repositoryTopics.pageInfo,
    };

    return NextResponse.json({ data: tags }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
