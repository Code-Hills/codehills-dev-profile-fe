/* eslint-disable no-nested-ternary */
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

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en', {
    month: 'long',
  }).format(date);
  const year = date.getFullYear();

  const suffix =
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

export function formatDateLocale(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
