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
 * Takes a date and checks it against the current date. To give a reable text version of how long has passed. Example: "1 week ago".
 * @param date The date you want to convert to a better readable date
 * @returns how long between current date and given date in text.
 */
export const readableDate = (date: Date) => {
  const currentDate = new Date();
};
