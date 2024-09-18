'use client';

import ProjectCard from '@/components/ProjectCard';
import { useRepositories } from '@/hooks/useRepositories';
import { NextPage } from 'next';

const RepoListPage: NextPage = () => {
  const { repositories, loading, error, updateName } = useRepositories({
    name: '',
    page: 1,
    perPage: 10,
    order: 'desc',
    sort: 'updated',
  });

  return (
    <main className="px-32">
      {/* Control panel */}
      <div className="h-10 mb-2 flex items-center">
        {/* Searchbar */}
        <div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            className="outline-none shadow-inner rounded-md px-1"
            onChange={(e) => updateName(e.target.value)}
          />
        </div>
      </div>

      {/* List of projects */}
      {loading ? (
        <div className="w-full text-center">Loading</div>
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
