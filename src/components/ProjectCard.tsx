import RepositorySchema from '@/schemas/repositorySchema';
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
        <h3>{project.name}</h3>
        <span className="text-sm italic over">{project.description}</span>
      </div>
    </Link>
  );
};

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
