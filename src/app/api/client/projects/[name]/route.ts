import repositoryGraphQL from '@/schemas/graphQL/repositoryGraphQL';
import { ProjectSchema } from '@/schemas/projectSchema';
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
          ${repositoryGraphQL}
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

    const repoData: ProjectSchema = {
      id: queryData.repository.id,
      name: queryData.repository.name,
      url: queryData.repository.url,
      description: queryData.repository.description,
      createdAt: queryData.repository.createdAt,
      updatedAt: queryData.repository.updatedAt,
      watchers: {
        totalCount: queryData.repository.watchers.totalCount,
        users: queryData.repository.watchers.users.map((user) => user.user),
        pageInfo: queryData.repository.watchers.pageInfo,
      },
      collaborators: {
        totalCount: queryData.repository.collaborators.totalCount,
        users: queryData.repository.collaborators.users.map((user) => user.user),
        pageInfo: queryData.repository.collaborators.pageInfo,
      },
      tags: {
        totalCount: queryData.repository.repositoryTopics.totalCount,
        tags: queryData.repository.repositoryTopics.topics.map((topic) => topic.node.topic.name),
        pageInfo: queryData.repository.repositoryTopics.pageInfo,
      },
      languages: queryData.repository.languages.languages.map((language) => language.name),
      commits: {
        totalCount: queryData.repository.defaultBranchRef.target.history.totalCount,
        commits: queryData.repository.defaultBranchRef.target.history.commits.map(
          (commit) => commit.commit
        ),
        pageInfo: queryData.repository.defaultBranchRef.target.history.pageInfo,
      },
    };

    return NextResponse.json({ data: repoData }, { status: 200 });
  } catch (error: any) {
    // Catch internal errors, log and return nondescript error for client
    console.error(`An unexpected error occurred: ${error}`);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
