import RepositorySchema from '@/schemas/repositorySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const repoName = params.name;

  if (!repoName) {
    return NextResponse.json({ error: 'Missing name in query' }, { status: 400 });
  }

  /* Fetch data from github */
  const repoResponse = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}`,
    {
      method: 'GET',
    }
  );
  const readMeResponse = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}/readme`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
    }
  );

  /* Await data */
  const repoData = await repoResponse.json();
  const readmeData = await readMeResponse.json();

  /* Return error if repo is not found */
  if (repoData.status === '404') {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  }

  /* Decode readme file data from base64 to string */
  const decodedReadMe = readmeData.content
    ? Buffer.from(readmeData.content, 'base64').toString('utf-8')
    : null;

  const repo: RepositorySchema = {
    id: repoData.id,
    name: repoData.name,
    description: repoData.description,
    url: repoData.html_url,
    lastUpdate: repoData.updated_at,
    createdAt: repoData.created_at,
    readMe: decodedReadMe,
  };

  return NextResponse.json({ data: repo }, { status: 200 });
}