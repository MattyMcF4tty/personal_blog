import React from 'react';
import ContributorSchema from '@/schemas/contributorSchema';
import Image from 'next/image';
import Link from 'next/link';

interface ContributorBoxProps {
  contributor: ContributorSchema;
}

const ContributorBox = ({ contributor }: ContributorBoxProps) => {
  return (
    <Link
      href={contributor.profileUrl}
      target="_blank"
      className="flex flex-row w-full duration-200 hover:shadow-lg rounded-lg p-2 select-none hover:cursor-pointer"
    >
      <Image
        alt="Avatar"
        src={contributor.avatar}
        width={50}
        height={50}
        className="rounded-full"
      />
      <div className="ml-2 h-full w-full flex flex-col justify-center">
        <p>{contributor.username}</p>
        <p className="text-sm text-gray-500">Contributions: {contributor.contributions}</p>
      </div>
    </Link>
  );
};

ContributorBox.displayName = 'ContributorBox';

export default ContributorBox;
