import React from 'react';
import { render } from '@testing-library/react';

import DashboardActivity from '@/modules/activities/DashboardActivity';

test('renders DashboardActivity correctly', () => {
  const { getByText } = render(<DashboardActivity />);
  const text = getByText(/Codehills/i);
  expect(text).toBeInTheDocument();
});
