export const getStatusClassesByColor = (
  color: 'green' | 'yellow' | 'orange' | 'red',
) => {
  switch (color) {
    case 'green':
      return 'bg-green-100 text-green-800 border-green-100 dark:border-green-500 dark:bg-gray-700 dark:text-green-400';

    case 'yellow':
      return 'bg-yellow-100 text-yellow-800 border-yellow-100 dark:border-yellow-400 dark:bg-gray-700 dark:text-yellow-400';

    case 'orange':
      return 'bg-orange-100 text-orange-800 border-orange-100 dark:bg-gray-700 dark:border-orange-300 dark:text-orange-300';
    default:
      return 'bg-red-100 text-red-800 border-red-100 dark:border-red-400 dark:bg-gray-700 dark:text-red-400';
  }
};
