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
    }
  );

  const responseData = await response.json();

  const repositories: RepositorySchema[] = responseData.map((repo: any) => {
    return {
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      lastUpdate: new Date(repo.updated_at),
      createdAt: new Date(repo.created_at),
    };
  });

  return NextResponse.json({ data: repositories });
}
