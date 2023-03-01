import React from 'react';
import { render } from '@testing-library/react';

import App from '@/App';

test('renders App correctly', () => {
  const { getByText } = render(<App />);
  const text = getByText(/Codehills/i);
  expect(text).toBeInTheDocument();
});
