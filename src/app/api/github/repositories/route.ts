import RepositorySchema from '@/schemas/repositorySchema';
import { NextRequest, NextResponse } from 'next/server';

/* Fetch repositories in order of latest update*/
export async function GET(req: NextRequest) {
  const response = await fetch(
    `https://api.github.com/users/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}/repos?sort=updated&direction=desc`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_API_KEY}`,
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
  console.log(repositories);

  return NextResponse.json({ data: repositories });
}
