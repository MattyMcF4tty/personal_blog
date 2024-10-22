import { CollaboratorsSchema } from '@/schemas/new Schemas/collaboratorsSchema';
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
      collaborators (first: 10, after: $pageCursor, affiliation: ALL){
        totalCount
        users: edges {
          user: node {
            login
            avatarUrl
            url
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

    const collaborators: CollaboratorsSchema = {
      totalCount: queryData.repository.collaborators.totalCount,
      users: queryData.repository.collaborators.users.map((user) => user.user),
      pageInfo: queryData.repository.collaborators.pageInfo,
    };

    return NextResponse.json({ data: collaborators }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}