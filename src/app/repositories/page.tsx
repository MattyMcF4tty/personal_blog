'use client';

import ProjectCard from '@/components/ProjectCard';
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
    <main className="px-32">
      {/* Control panel */}
      <div className="h-10 mb-2 bg-blue-300"></div>

      {/* List of projects */}
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="grid grid-cols-4 w-full gap-6">
          {repositories.map((repo) => (
            <ProjectCard key={repo.id} project={repo} />
          ))}
        </div>
      )}
    </main>
  );
};

export default RepoListPage;
