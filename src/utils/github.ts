import CommitSchema from '@/schemas/commitSchema';
import ContributorSchema from '@/schemas/contributorSchema';
import RepositorySchema from '@/schemas/repositorySchema';
import userSchema from '@/schemas/userSchema';

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

/**
 * Fetches users repositories.
 * @param page The current page of repositories. Defaults to 1.
 * @param perPage Number of repositories per page. Max is 100. Defaults to 10.
 * @param order The order of the repositories. Can be 'asc' or 'desc'. Defaults to 'desc'.
 * @param sort - The value to order by. Can be `'updated'`. Defaults to `'updated'`
 * @returns `RepositorySchema[]`
 */
export const fetchUserRepos = async (
  page: number = 1,
  perPage: number = 10,
  order: 'asc' | 'desc' = 'desc',
  sort: 'updated' | 'created' = 'updated'
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/github/repositories?page=${page}&perPage=${perPage}&order=${order}&sort=${sort}`,
      {
        method: 'GET',
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const repos = await response.json();

    return repos.data as RepositorySchema[];
  } catch (error) {
    console.error('Failed to fetch repositories:', error);
    return [];
  }
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

/**
 * Fetches a repositories commits.
 * @param repoName - The name of the repository from which to fetch commits from. `Required`
 * @param page - The current page of commits. Defaults to `1`.
 * @param perPage - Number of commits per page. Max is `100`. Defaults to `10`.
 * @returns `CommitSchema[]`
 */
export const fetchRepoCommits = async (
  repoName: string,
  page: number = 1,
  perPage: number = 10
) => {
  const response = await fetch(
    `http://localhost:3000/api/github/repositories/${repoName}/commits?page=${page}&perPage=${perPage}`,
    {
      method: 'GET',
      next: { revalidate: 3600 }, // Revalidates every hour
    }
  );

  const commits = await response.json();

  return commits.data as CommitSchema[];
};
