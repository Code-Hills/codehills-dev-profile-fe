import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';

import PageNotFound from '@/modules/activities/ErrorPage';

test('renders PageNotFound correctly', () => {
  const { getByText } = render(
    <Router>
      <PageNotFound />
    </Router>,
  );
  const text = getByText(/Back/i);
  expect(text).toBeInTheDocument();
});
