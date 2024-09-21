'use client';

import Inputfield from '@/components/Inputfield';
import ProjectCard from '@/components/ProjectCard';
import { useRepositories } from '@/hooks/useRepositories';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';

const RepoListPage: NextPage = () => {
  const { repositories, loading, error, updateName, updateOrder, currentOrder, updateSort } =
    useRepositories({
      name: '',
      page: 1,
      perPage: 10,
      order: 'desc',
      sort: 'updated',
    });

  return (
    <main className="px-32 pt-6">
      {/* Control panel */}
      <div className="mb-4 flex items-center bg-white w-full rounded-md h-10 px-2">
        <Inputfield
          variant={'search'}
          placeholder="Search"
          inputSize={'medium'}
          onHitEnter={(e) => updateName(e.currentTarget.value)}
        />
        <select defaultValue={'updated'} onChange={(e) => updateSort(e.currentTarget.value as any)}>
          <option value="updated">Updated</option>
          <option value="forks">Forks</option>
          <option value="stars">Stars</option>
        </select>
        <button onClick={() => updateOrder(currentOrder === 'asc' ? 'desc' : 'asc')}>
          <FontAwesomeIcon
            icon={faArrowUp}
            className={`${currentOrder === 'desc' ? 'rotate-180' : 'rotate-0'} duration-200`}
          />
        </button>
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
