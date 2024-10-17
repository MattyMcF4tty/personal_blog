import CommitSchema from '@/schemas/commitSchema';
import CommitQuery from '@/schemas/queries/commitQuerySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: any) {
  /* Gets the params from the query */
  const searchParams = req.nextUrl.searchParams;
  const repoName = params.name; // As the name query comes from the nextjs dynamic route. We have to get it differently.
  const page = parseInt(searchParams.get('page') || '1');
  const perPage = parseInt(searchParams.get('perPage') || '10');

  /* Check if user has provided the repos name in the url query */
  if (!repoName) {
    return NextResponse.json({ error: 'Missing name in query' }, { status: 400 });
  }

  const commitQuery = new CommitQuery(repoName, page, perPage);

  const response = await fetch(
    `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${
      commitQuery.repoName
    }/commits?${commitQuery.toQueryString()}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
      },
      cache: 'no-store',
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    console.error('error' + responseData.error);
  }

  const commits: CommitSchema[] = responseData.map((commitData: any) => {
    /* 
    Splits the message where is one or two '\n'. This is to take account for how the user creates a new line when writing the commit description. 
    By default we know that the first '\n' is where the title is.
    */
    const [title, ...description] = commitData.commit.message
      .split(/\n+/)
      .filter((line: any) => line.trim() !== '');

    const commit: CommitSchema = {
      sha: commitData.sha,
      author: {
        avatar: commitData.author.avatar_url,
        id: commitData.author.id,
        name: null,
        profileUrl: commitData.author.html_url,
        repositories: null,
        username: commitData.author.login,
      },
      date: commitData.commit.author.date,
      title: title,
      description: description,
      url: commitData.html_url,
    };

    return commit;
  });

  return NextResponse.json({ data: commits }, { status: 200 });
}
