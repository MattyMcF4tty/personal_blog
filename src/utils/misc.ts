import { ClassValue } from 'class-variance-authority/dist/types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const copyTextToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((err) => {
      console.error('Could not copy text: ', err);
    });
};

/**
 * Creates a false promise to test asynchronous functions.
 * @param delay How long the promise should take before resolving
 * @returns Nothing
 */
export const falsePromise = (delay: number) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, delay);
  });

  return promise;
};

/* TODO: Something is not working. It gets stuck on 10 minutes */
/**
 * Takes a date and checks it against the current date. To give a reable text version of how much time has passed since. Example: "1 week ago".
 * @param date The date you want to convert to a better readable date. Must be earlier than current date.
 * @returns how long between current date and given date in text.
 */
export const readableDateDif = (date: Date): string => {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - date.getTime(); // Difference in milliseconds

  const minuteDiff = Math.floor(timeDiff / (1000 * 60)); // Convert milliseconds to minutes
  const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
  const dayDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  const monthDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)); // Approximate month calculation. We approximate the month to be 30 days.
  const yearDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365)); // Approximate year calculation. We approximate the month to be 365 days.

  if (yearDiff >= 1) {
    return `${yearDiff} year${yearDiff > 1 ? 's' : ''} ago`;
  } else if (monthDiff >= 1) {
    return `${monthDiff} month${monthDiff > 1 ? 's' : ''} ago`;
  } else if (dayDiff >= 1) {
    return `${dayDiff} day${dayDiff > 1 ? 's' : ''} ago`;
  } else if (hourDiff >= 1) {
    return `${hourDiff} hour${hourDiff > 1 ? 's' : ''} ago`;
  } else if (minuteDiff >= 1) {
    return `${minuteDiff} minute${minuteDiff > 1 ? 's' : ''} ago`;
  } else {
    return 'Now';
  }
};

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
