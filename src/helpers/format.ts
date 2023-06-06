import { Cycle } from '@/interfaces/cycle.interface';

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

export const getReviewCycleLabel = (cycle: Cycle) => {
  const startDate = new Date(cycle.startDate);
  const endDate = new Date(cycle.endDate);

  const startMonth = startDate.toLocaleString('default', {
    month: 'short',
  });
  const endMonth = endDate.toLocaleString('default', {
    month: 'short',
  });
  const uniqueId = cycle.id.substring(0, 4);

  return `${startMonth}-${endMonth} ${startDate.getFullYear()} (${uniqueId})`;
};
