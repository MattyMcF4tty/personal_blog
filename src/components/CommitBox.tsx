import React from 'react';
import Link from 'next/link';
import CommitSchema from '@/schemas/commitSchema';

interface CommitBoxProps {
  commit: CommitSchema;
}

const CommitBox = ({ commit }: CommitBoxProps) => {
  // Ensure the description is always an array for consistent rendering
  const descriptionArray = Array.isArray(commit.description)
    ? commit.description
    : [commit.description];

  return (
    <Link
      href={commit.url}
      target="_blank"
      className="flex flex-row w-full duration-200 hover:shadow-lg rounded-lg p-2 select-none hover:cursor-pointer"
    >
      <div className="ml-2 h-full w-full flex flex-col justify-center">
        <h3 className="break-words">{commit.title}</h3>
        <div className="text-sm text-gray-500">
          {descriptionArray.map((line, index) => (
            <p key={index} className="mb-1">
              {line}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

CommitBox.displayName = 'CommitBoxBox';

export default CommitBox;
