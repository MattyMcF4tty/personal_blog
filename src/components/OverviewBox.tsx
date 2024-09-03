import { HTMLAttributes, forwardRef } from 'react';

interface OverviewBoxProps extends HTMLAttributes<HTMLDivElement> {}

const OverviewBox = forwardRef<HTMLDivElement, OverviewBoxProps>((props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      ref={ref}
      className={`h-screen min-w-full max-w-screen ${className} px-32 py-10`}
      {...otherProps}
    >
      {children}
    </div>
  );
});
OverviewBox.displayName = 'OverviewBox';

export default OverviewBox;
