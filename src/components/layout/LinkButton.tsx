import { cn } from '@/utils/misc';
import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import React, { FC } from 'react';

const linkButtonVariants = cva(
  ['text-textColor-primary w-[10rem] h-[3.5rem] flex text-center items-center justify-center'],
  {
    variants: {
      variant: {
        default: 'border-tech bg-transparent hover:bg-primary-500 duration-slow',
        navbar: 'border-x-[2px] border-primary-400 hover:bg-primary-500 hover:border-primary-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface LinkButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonVariants> {
  children?: React.ReactNode;
  href: string;
}

const LinkButton: FC<LinkButtonProps> = ({ className, variant, children, href, ...props }) => {
  return (
    <Link href={href} className={cn(linkButtonVariants({ variant }), className)} {...props}>
      {children}
    </Link>
  );
};

LinkButton.displayName = 'LinkButton';

export default LinkButton;
