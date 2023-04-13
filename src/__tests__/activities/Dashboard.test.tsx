import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import DashboardActivity from '@/modules/activities/DashboardActivity';
import Secure from '@/utils/secureLs';

const mockStore = configureMockStore([thunk]);

describe('DashboardActivity component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      // Add any initial state that you need here
    });
  });

  it('should dispatch logout action when Sign Out link is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardActivity />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(getByText('Sign Out'));
  });

  it('should remove pulseToken from localStorage when Logout button is clicked', () => {
    localStorage.setItem('pulseToken', 'some-value');

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardActivity />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.click(getByText('Sign Out'));

    expect(Secure.getToken()).toBeNull();
  });
});
