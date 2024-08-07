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
    <div ref={ref} className={`${className} mt-3.5 mb-0.5`} {...otherProps}>
      <button
        onClick={() => setHideText(!hideText)}
        className="text-lg font-bold select-none w-full justify-start flex items-center "
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          className={`${!hideText && 'rotate-180'} duration-200 text-sm mr-2`}
        />
        {title}
      </button>
      <div hidden={hideText} className="text-black leading-relaxed mt-1 break-words">
        {children}
      </div>
    </div>
  );
});

TextSection.displayName = 'TextSection';

export default TextSection;
