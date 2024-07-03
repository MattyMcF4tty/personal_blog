import RepositorySchema from '@/schemas/repositorySchema';
import RedirectButton from './github/RedirectButton';
import Link from 'next/link';

interface ProjectBubbleProps {
  repo: RepositorySchema;
}

const ProjectBubble: React.FC<ProjectBubbleProps> = ({ repo }) => {
  return (
    <div className="w-full h-full bg-gradient-to-tr from-blue-950 to-blue-500 rounded-2xl p-8 duration-150 shadow-xl">
      <div className="h-full w-full relative flex flex-col">
        <h1 className="text-xl mb-4 select-none hover:cursor-pointer text-white">{repo.name}</h1>
        <span className="select-none text-white">{repo.description}</span>

        <div className="absolute bottom-0 flex flex-row justify-evenly w-full h-10 select-none">
          <Link
            href={`repositories/${repo.id}`}
            className="text-black bg-white w-1/4 rounded-md flex text-center justify-center items-center"
          >
            Read more
          </Link>
          <RedirectButton url={repo.url} />
        </div>
      </div>
    </div>
  );
};

export default ProjectBubble;
