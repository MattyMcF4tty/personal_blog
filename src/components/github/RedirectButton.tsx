import Link from 'next/link';
import React, { FC } from 'react';

interface RedirectButtonProps {
  url: string;
}
const RedirectButton: FC<RedirectButtonProps> = ({ url }) => {
  return (
    <Link
      href={url}
      target="_blank"
      className="text-white  w-1/4 rounded-md flex text-center items-center justify-center
      bg-gradient-to-tr from-[#24292e] to-[#2b3137] hover:from-[#24292e] hover:to-[#6e5494]"
    >
      GitHub
    </Link>
  );
};

export default RedirectButton;
