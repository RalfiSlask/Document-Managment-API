export const getStringWithcapitalizedFirstLetter = (text: string) => {
  const firstLetterUppercase = text.charAt(0).toUpperCase() + text.slice(1);
  return firstLetterUppercase;
};

export const getPasswordStrengthTitle = (strength: number) => {
  if (strength > 6) return 'Strong';
  if (strength > 3) return 'Medium';
  if (strength > 0) return 'Weak';
  return 'None';
};
