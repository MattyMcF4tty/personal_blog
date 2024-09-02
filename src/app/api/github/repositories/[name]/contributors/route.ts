import ContributorSchema from '@/schemas/contributorSchema';
import ContributorQuery from '@/schemas/queries/contributorQuerySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  /* Gets the params from the query */
  const searchParams = req.nextUrl.searchParams;
  const repoName = params.name; // As the name query comes from the nextjs dynamic route. We have to get it differently.
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '10');

  /* Check if user has provided the repos name in the url query */
  if (!repoName) {
    return NextResponse.json({ error: 'Missing name in query' }, { status: 400 });
  }

  const contributiorQuery = new ContributorQuery(repoName, page, perPage);

  /* Fetch repo contributors from github */
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${
      contributiorQuery.repoName
    }/contributors?${contributiorQuery.toQueryString()}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
      cache: 'no-store',
    }
  );

  /* Await response data */
  const responseData = await response.json();

  /* Simple error handling if response does not return ok */
  if (!response.ok) {
    return NextResponse.json(
      { error: responseData.error },
      { status: Number(responseData.status) }
    );
  }

  /* Cut out all the data we dont need */
  const contributorData = responseData.map((contributorData: any) => {
    const contributor: ContributorSchema = {
      id: contributorData.id,
      username: contributorData.login,
      contributions: contributorData.contributions,
      avatar: contributorData.avatar_url,
      profileUrl: contributorData.html_url,
      name: null,
      repositories: null,
    };
    return contributor;
  });

  return NextResponse.json({ data: contributorData }, { status: 200 });
}
