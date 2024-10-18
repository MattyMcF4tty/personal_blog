import { Octokit } from '@octokit/core';

let octoClient: Octokit | null = null;

export const createOctokitClient = () => {
  if (!octoClient) {
    console.log('Creating new instance of Octokit Client');
    const githubApiKey = process.env.GITHUB_API_KEY as string;

    octoClient = new Octokit({ auth: githubApiKey });
  }

  return octoClient;
};
