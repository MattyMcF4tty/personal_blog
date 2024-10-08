import RepoQuery from '@/schemas/queries/repoQuerySchema';
import RepositorySchema from '@/schemas/repositorySchema';
import { NextRequest, NextResponse } from 'next/server';

/* Fetch repositories in order of latest update*/
export async function GET(req: NextRequest) {
  /* Gets the params from the query */
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '10');
  const order = (searchParams.get('order') as 'asc' | 'desc') || 'desc';
  const sort = (searchParams.get('sort') as 'updated' | 'forks' | 'stars') || 'updated';
  const name = searchParams.get('name') || '';

  const repoQuery = new RepoQuery(name, page, perPage, order, sort);

  const response = await fetch(
    `https://api.github.com/search/repositories?${repoQuery.toQueryString()}`,
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

  const queryData = responseData.items;

  const repositories: RepositorySchema[] = queryData.map((repoData: any) => {
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

    return repository;
  });

  return NextResponse.json({ data: repositories }, { status: 200 });
}
