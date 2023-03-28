import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import DashboardActivity from '@/modules/activities/DashboardActivity';
import Secure from '@/utils/secureLs';

test('renders DashboardActivity correctly', async () => {
  const { findAllByText } = render(
    <Router>
      <DashboardActivity />
    </Router>,
  );
  const elements = await findAllByText(/Codehills/i);
  expect(elements.length).not.toBe(0);
});
