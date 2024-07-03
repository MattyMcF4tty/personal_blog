import { HTMLAttributes, forwardRef } from 'react';

interface OverviewBoxProps extends HTMLAttributes<HTMLDivElement> {}

const OverviewBox = forwardRef<HTMLDivElement, OverviewBoxProps>((props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <div ref={ref} className={`h-screen w-screen ${className} px-32 py-10`} {...otherProps}>
      {children}
    </div>
  );
});

export default OverviewBox;
