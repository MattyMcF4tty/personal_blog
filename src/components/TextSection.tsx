'use client';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HTMLAttributes, forwardRef, useState } from 'react';

interface TextSectionProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

const TextSection = forwardRef<HTMLDivElement, TextSectionProps>((props, ref) => {
  const { className, children, title, ...otherProps } = props;

  const [hideText, setHideText] = useState<boolean>(false);

  return (
    <div ref={ref} className={`w-full ${className} `} {...otherProps}>
      <button onClick={() => setHideText(!hideText)} className="text-lg font-semibold">
        <FontAwesomeIcon
          icon={faChevronUp}
          className={`${!hideText && 'rotate-180'} duration-200 text-sm mr-2`}
        />
        {title}
      </button>
      <div hidden={hideText}>{children}</div>
    </div>
  );
});

TextSection.displayName = 'TextSection';

export default TextSection;
