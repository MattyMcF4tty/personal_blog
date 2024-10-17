import RepositorySchema from '@/schemas/repositorySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const repoName = params.name;

  /* Check if user has provided the repos name in the url query */
  if (!repoName) {
    return NextResponse.json({ error: 'Missing name in query' }, { status: 400 });
  }

  /* Fetch data from repo */
  const repoResponse = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
      cache: 'no-store',
    }
  );
  /* Fetch readme data */
  const readMeResponse = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}/readme`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
      cache: 'no-store',
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
    stars: repoData.stargazers_count,
    watchers: repoData.watchers_count,
    forks: repoData.forks_count,
    topics: repoData.topics,
    owner: {
      id: repoData.owner.login,
      avatar: repoData.owner.avatar_url,
      name: null,
      profileUrl: repoData.owner.html_url,
      repositories: null,
      username: repoData.owner.login,
    },
  };

  return NextResponse.json({ data: repo }, { status: 200 });
}
