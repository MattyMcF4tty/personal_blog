import RepositorySchema from '@/schemas/repositorySchema';
import { NextRequest, NextResponse } from 'next/server';

/* Fetch repositories in order of latest update*/
export async function GET(req: NextRequest) {
  const response = await fetch(
    `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos?sort=updated&direction=desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
      cache: 'no-store',
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: responseData.error },
      { status: Number(responseData.status) }
    );
  }

  const repositories: RepositorySchema[] = responseData.map((repoData: any) => {
    const repository: RepositorySchema = {
      id: repoData.id,
      name: repoData.name,
      description: repoData.description,
      url: repoData.html_url,
      lastUpdate: repoData.updated_at,
      createdAt: repoData.created_at,
      readMe: null,
      stars: repoData.stargazers_count,
      watchers: repoData.watchers_count,
      owner: {
        id: repoData.owner.login,
        avatar: repoData.owner.avatar_url,
        name: null,
        profileUrl: repoData.owner.html_url,
        repositories: null,
        username: repoData.owner.login,
      },
    };

    return repository;
  });

  return NextResponse.json({ data: repositories }, { status: 200 });
}
