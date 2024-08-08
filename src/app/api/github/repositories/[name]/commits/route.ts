import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { name: string } }) {
  const repoName = params.name;

  /* Check if user has provided the repos name in the url query */
  if (!repoName) {
    return NextResponse.json({ error: 'Missing name in query' }, { status: 400 });
  }

  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}/commits?per_page=10`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
      cache: 'no-store',
    }
  );

  const responseData = await response.json();
  /*   console.log(responseData);
   */
  return NextResponse.json({}, { status: 200 });
}
