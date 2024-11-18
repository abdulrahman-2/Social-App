export const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
};
