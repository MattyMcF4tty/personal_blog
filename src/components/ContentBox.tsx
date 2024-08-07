import { HTMLAttributes, forwardRef } from 'react';

interface OverviewBoxProps extends HTMLAttributes<HTMLDivElement> {}

const ContentBox = forwardRef<HTMLDivElement, OverviewBoxProps>((props, ref) => {
  const { className, children, ...otherProps } = props;

  return (
    <div ref={ref} className={`${className} p-4 bg-white rounded-lg shadow-md`} {...otherProps}>
      {children}
    </div>
  );
});
ContentBox.displayName = 'ContentBox';

export default ContentBox;
