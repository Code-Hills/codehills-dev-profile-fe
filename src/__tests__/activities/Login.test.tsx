// import React from 'react';
// import { render } from '@testing-library/react';

// import LoginActivity from '@/modules/activities/LoginActivity';

// test('renders LoginActivity correctly', () => {
//   const { getByText } = render(<LoginActivity />);
//   const text = getByText(/Login Codehills/i);
//   expect(text).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginActivity from '@/modules/activities/LoginActivity';

const mockStore = configureMockStore([thunk]);

describe('LoginActivity', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
        user: null,
        loading: false,
        error: null,
      },
    });
  });

  it('renders the login form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginActivity />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/You will never regret to join Codehills/i)).toBeInTheDocument();
    expect(screen.getByText(/We're glad you're here!/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    // expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Microsoft Logo/i)).toBeInTheDocument();
  });

  it('handles the Microsoft login button click', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginActivity />
        </BrowserRouter>
      </Provider>
    );

    const microsoftBtn = screen.getByRole('button', { name: /Sign in with Microsoft/i });
    userEvent.click(microsoftBtn);

    expect(window.location.href).toBe('http://localhost:3000/');
  });
});
