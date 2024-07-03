'use client';
import RepositorySchema from '@/schemas/repositorySchema';
import { useRouter } from 'next/router';
import RedirectButton from './github/RedirectButton';

interface ProjectBubbleProps {
  repo: RepositorySchema;
}

const ProjectBubble: React.FC<ProjectBubbleProps> = ({ repo }) => {
  return (
    <div className="w-full h-full bg-gradient-to-tr from-blue-950 to-blue-500 rounded-2xl p-8 hover:scale-105 duration-150 shadow-xl">
      <div className="h-full w-full relative flex flex-col">
        <h1
          className="text-xl mb-4 select-none hover:cursor-pointer"
          onClick={() => navigator.clipboard.writeText(repo.name)}
        >
          {repo.name}
        </h1>
        <span className="select-none">{repo.description}</span>

        <div className="absolute bottom-0 flex flex-row justify-evenly w-full h-10 select-none">
          <button
            onClick={() => useRouter().replace(repo.url)}
            className="text-black bg-white w-1/4 rounded-md"
          >
            Read more
          </button>
          <RedirectButton url={repo.url} />
        </div>
      </div>
    </div>
  );
};

export default ProjectBubble;
