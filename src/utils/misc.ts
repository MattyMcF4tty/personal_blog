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
const falsePromise = (delay: number) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, delay);
  });

  return promise;
};
