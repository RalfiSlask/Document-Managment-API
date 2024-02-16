export const getStringWithcapitalizedFirstLetter = (text: string) => {
  const firstLetterUppercase = text.charAt(0).toUpperCase() + text.slice(1);
  return firstLetterUppercase;
};
