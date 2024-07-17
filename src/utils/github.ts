import RepositorySchema from '@/schemas/repositorySchema';

export const fetchUserData = async () => {
  const response = await fetch(`http://localhost:3000/api/github/user`, {
    method: 'GET',
    next: { revalidate: 300 }, // revalidates every 5 minutes
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const user = await response.json();
  return user.data;
};

export const fetchUserRepos = async () => {
  const response = await fetch(`http://localhost:3000/api/github/repositories`, {
    method: 'GET',
    next: { revalidate: 86400 }, // Revalidates every day
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const repos = await response.json();

  return repos.data as RepositorySchema[];
};
