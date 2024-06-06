import { HTMLAttributes, forwardRef } from 'react';

interface OverviewBoxProps extends HTMLAttributes<HTMLDivElement> {}

const OverviewBox = forwardRef<HTMLDivElement, OverviewBoxProps>((props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <div ref={ref} className={`h-screen w-screen ${className}`} {...otherProps}>
      {children}
    </div>
  );
});

export default OverviewBox;
