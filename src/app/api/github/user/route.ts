import GitHubUser from '@/schemas/userSchema';
import { NextRequest, NextResponse } from 'next/server';

/* Fetch user data */
export async function GET(req: NextRequest) {
  const response = await fetch(`https://api.github.com/users/${process.env.GITHUB_USERNAME}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_KEY}`,
    },
  });
  const responseData = await response.json();

  const user: GitHubUser = {
    id: responseData.id,
    name: responseData.name,
    username: responseData.login,
    repositories: responseData.public_repos,
    profileUrl: responseData.html_url,
    profileImage: responseData.avatar_urlm,
  };

  console.log(user);

  return NextResponse.json({ data: user });
}
