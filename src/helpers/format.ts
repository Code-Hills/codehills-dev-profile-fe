export const formatJoiErorr = (error: string) => {
  if (!error) {
    return '';
  }
  const message = error.replace(/"/g, '').replace(/Id/g, '');
  return message.charAt(0).toUpperCase() + message.slice(1);
};
