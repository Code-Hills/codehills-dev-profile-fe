import { Cycle } from '@/interfaces/cycle.interface';

export const findActiveCycle = (cycles: Cycle[]) => {
  return cycles.find(cycle => cycle.active === true);
};

export const calculateCycleEnd = (cycle: Cycle) => {
  const endDate = new Date(cycle.endDate);
  const today = new Date();

  // Calculate the time difference in milliseconds
  const timeDiff = endDate.getTime() - today.getTime();

  // Convert milliseconds to seconds, minutes, hours, and days
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `This cycle will end in ${weeks} week${
      weeks > 1 ? 's' : ''
    }`;
  }
  if (days > 0) {
    return `This cycle will end in ${days} day${days > 1 ? 's' : ''}`;
  }
  if (hours > 0) {
    return `This cycle will end in ${hours} hour${
      hours > 1 ? 's' : ''
    }`;
  }
  if (minutes > 0) {
    return `This cycle will end in ${minutes} minute${
      minutes > 1 ? 's' : ''
    }`;
  }
  if (seconds > 0) {
    return `This cycle will end in ${seconds} second${
      seconds > 1 ? 's' : ''
    }`;
  }
  return 'This cycle has already ended';
};
