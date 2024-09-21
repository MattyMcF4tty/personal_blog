import RepositorySchema from '@/schemas/repositorySchema';
import { faCodeFork, faEye, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';

interface ProjectCardProps {
  project: RepositorySchema;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={`repositories/${project.name}`}
      className="rounded-lg shadow-xl w-full h-60 hover:scale-105 duration-200 overflow-hidden"
    >
      <Image
        alt="ProjectImage"
        src={'/portrait.jpg'}
        width={100}
        height={100}
        className="h-1/2 w-full"
      />
      <div className="p-4">
        <div className="flex flex-row justify-between">
          <h3>{project.name}</h3>
          <div className="text-sm text-gray-500 flex flex-row max-w-xs select-none">
            <p className="mr-2">
              <FontAwesomeIcon icon={faCodeFork} /> {project.forks}
            </p>
            <p>
              <FontAwesomeIcon icon={faStar} /> {project.stars}
            </p>
          </div>
        </div>
        <span className="text-sm italic over">{project.description}</span>
      </div>
    </Link>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
