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
      className="text-white bg-gradient-to-tr from-[#24292e] to-[#2b3137] w-1/4 rounded-md flex text-center items-center justify-center hover:scale-105 duration-100"
    >
      GitHub
    </Link>
  );
};

export default RedirectButton;
