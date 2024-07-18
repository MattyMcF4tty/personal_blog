import RepositorySchema from '@/schemas/repositorySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const repoName = params.name;

  if (!repoName) {
    return NextResponse.json({ error: 'Missing name in query' }, { status: 400 });
  }

  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}`,
    {
      method: 'GET',
    }
  );

  const repoData = await response.json();

  const repo: RepositorySchema = {
    id: repoData.id,
    name: repoData.name,
    description: repoData.description,
    url: repoData.html_url,
    lastUpdate: repoData.updated_at,
    createdAt: repoData.created_at,
  };

  return NextResponse.json({ data: repo }, { status: 200 });
}
