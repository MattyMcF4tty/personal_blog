import ContributorSchema from '@/schemas/contributorSchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const repoName = params.name;

  /* Check if user has provided the repos name in the url query */
  if (!repoName) {
    return NextResponse.json({ error: 'Missing name in query' }, { status: 400 });
  }

  /* Fetch repo contributors from github */
  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}/contributors`,
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
