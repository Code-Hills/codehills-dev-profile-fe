export const formatJoiErorr = (error: string) => {
  if (!error) {
    return '';
  }
  const message = error.replace(/"/g, '').replace(/Id/g, '');
  return message.charAt(0).toUpperCase() + message.slice(1);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en', {
    month: 'long',
  }).format(date);
  const year = date.getFullYear();
  const suffix =
    // eslint-disable-next-line no-nested-ternary
    day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
  return `${day}${suffix} ${month} ${year}`;
};
