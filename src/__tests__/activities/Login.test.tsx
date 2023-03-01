import React from 'react';
import { render } from '@testing-library/react';

import LoginActivity from '@/modules/activities/LoginActivity';

test('renders LoginActivity correctly', () => {
  const { getByText } = render(<LoginActivity />);
  const text = getByText(/Login Codehills/i);
  expect(text).toBeInTheDocument();
});
