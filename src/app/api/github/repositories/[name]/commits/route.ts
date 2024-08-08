import CommitSchema from '@/schemas/commitSchema';
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

  const commits: CommitSchema[] = responseData.map((commitData: any) => {
    /* Cut out title */
    const [title, ...description] = commitData.commit.committer.message.split('\n\n');

    const commit: CommitSchema = {
      committer: {
        avatar: commitData.committer.avatar_url,
        id: commitData.committer.id,
        name: null,
        profileUrl: commitData.committer.html_url,
        repositories: null,
        username: commitData.committer.login,
      },
      date: commitData.commit.comitter.date,
      title: title,
      description: description,
      url: commitData.html_url,
    };

    return commit;
  });

  return NextResponse.json({ data: commits }, { status: 200 });
}
