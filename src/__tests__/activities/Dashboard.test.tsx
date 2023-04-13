import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import DashboardActivity from '@/modules/activities/DashboardActivity';
import Secure from '@/utils/secureLs';
import store from '@/redux/store';

test('renders DashboardActivity correctly', async () => {
  const { findAllByText } = render(
    <Provider store={store}>
      <Router>
        <DashboardActivity />
      </Router>
    </Provider>,
  );
  const elements = await findAllByText(/Codehills/i);
  expect(elements.length).not.toBe(0);
});
