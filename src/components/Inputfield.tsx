import { cn } from '@/utils/misc';
import { VariantProps, cva } from 'class-variance-authority';
import React, { FC } from 'react';

const inputfieldVariants = cva('bg-white rounded-md px-1', {
  variants: {
    variant: {
      default: '',
      search: 'outline-none focus:shadow-inner focus:bg-gray-50',
    },
    inputSize: {
      small: 'text-sm w-[27ch]',
      medium: 'text-base w-[32ch] h-[30px]',
      large: 'text-lg w-[37ch]',
    },
  },
  defaultVariants: {
    variant: 'default',
    inputSize: 'medium',
  },
});

interface InputfieldProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputfieldVariants> {
  onHitEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Inputfield: FC<InputfieldProps> = ({
  className,
  inputSize,
  variant,
  onHitEnter,
  ...props
}) => {
  // Handler for the key up event inside the component
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onHitEnter?.(event);
    }
  };

  return (
    <input
      className={cn(inputfieldVariants({ variant, inputSize, className }))}
      onKeyUp={handleKeyPress}
      {...props}
    />
  );
};

Inputfield.displayName = 'Inputfield';

export default Inputfield;
