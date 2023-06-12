export const capitalizeFirstLetter = (input: string): string => {
  if (input.length === 0) {
    return input;
  }

  const [firstLetter, ...restOfWord] = input;
  return `${firstLetter.toUpperCase()}${restOfWord.join('')}`;
};
