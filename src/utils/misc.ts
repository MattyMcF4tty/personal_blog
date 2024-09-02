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

/**
 * Takes a date and checks it against the current date. To give a reable text version of how much time has passed since. Example: "1 week ago".
 * @param date The date you want to convert to a better readable date. Must be earlier than current date.
 * @returns how long between current date and given date in text.
 */
export const readableDateDif = (date: Date): string => {
  const currentDate = new Date();

  /* Calculates the difference between different time periods and rounds to lowest number. */
  const minuteDif = Math.floor(currentDate.getMinutes() - date.getMinutes());
  const hourDif = Math.floor(currentDate.getHours() - date.getHours());
  const dayDif = Math.floor(currentDate.getDate() - date.getDate());
  const monthDif = Math.floor(currentDate.getMonth() - date.getMonth());
  const yearDif = Math.floor(currentDate.getFullYear() - date.getFullYear());

  /* For debugging
    console.log(
      `Dates:\ncurrentDate: ${currentDate}\ndate: ${date}\n\nDate difference:\nminuteDif: ${minuteDif}\nhourDif: ${hourDif}\ndayDif: ${dayDif}\nmonthDif: ${monthDif}\nyearDif: ${yearDif}`
    );
  */

  //TODO: Not calculating correctly. Example: If I gives you a date where the day is one day before new month. The next day it will say "One month ago".
  /* Returns how long has passed in text, except if under one minute ago. Then returns now */
  if (yearDif >= 1) {
    return `${yearDif} year${yearDif > 1 ? 's' : ''} ago`;
  } else if (monthDif >= 1) {
    return `${monthDif} month${monthDif > 1 ? 's' : ''} ago`;
  } else if (dayDif >= 1) {
    return `${dayDif} day${dayDif > 1 ? 's' : ''} ago`;
  } else if (hourDif >= 1) {
    return `${hourDif} hour${hourDif > 1 ? 's' : ''} ago`;
  } else if (minuteDif >= 1) {
    return `${minuteDif} minute${minuteDif > 1 ? 's' : ''} ago`;
  } else {
    return 'Now';
  }
};
