import CommitSchema from '@/schemas/commitSchema';
import ContributorSchema from '@/schemas/contributorSchema';
import RepositorySchema from '@/schemas/repositorySchema';
import userSchema from '@/schemas/userSchema';
import { Console } from 'console';

export const fetchUserData = async () => {
  const response = await fetch(`http://localhost:3000/api/github/user`, {
    method: 'GET',
    next: { revalidate: 86400 }, // revalidates every 24 hours
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const user = await response.json();
  return user.data as userSchema;
};

export const fetchUserRepos = async () => {
  const response = await fetch(`http://localhost:3000/api/github/repositories`, {
    method: 'GET',
    next: { revalidate: 3600 }, // Revalidates every hour
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const repos = await response.json();

  return repos.data as RepositorySchema[];
};

export const fetchRepo = async (repoName: string) => {
  const response = await fetch(`http://localhost:3000/api/github/repositories/${repoName}`, {
    method: 'GET',
    next: { revalidate: 3600 }, // Revalidates every hour
  });

  const repo = await response.json();

  if (!response.ok) {
    throw new Error(repo.error);
  }

  return repo.data as RepositorySchema;
};

export const fetchRepoContributors = async (repoName: string) => {
  const response = await fetch(
    `http://localhost:3000/api/github/repositories/${repoName}/contributors`,
    {
      method: 'GET',
      next: { revalidate: 3600 }, // Revalidates every hour
    }
  );

  const contributors = await response.json();

  return contributors.data as ContributorSchema[];
};

export const fetchRepoCommits = async (repoName: string) => {
  const response = await fetch(
    `http://localhost:3000/api/github/repositories/${repoName}/commits`,
    {
      method: 'GET',
      next: { revalidate: 3600 }, // Revalidates every hour
    }
  );

  const commits = await response.json();

  return commits.data as CommitSchema[];
};
