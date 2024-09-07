'use client';

import { useRepositories } from '@/hooks/useRepositories';
import { NextPage } from 'next';
import { useEffect } from 'react';

const RepoListPage: NextPage = () => {
  const { repositories, loading, error } = useRepositories({
    page: 1,
    perPage: 10,
    order: 'desc',
    sort: 'created',
  });

  useEffect(() => {
    console.log(loading);
  }, [loading, error]);
  return (
    <main>
      {loading && <p>Loading</p>}
      {repositories.map((repo) => (
        <span>{repo.name}</span>
      ))}
    </main>
  );
};

export default RepoListPage;
