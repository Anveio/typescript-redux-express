import * as React from 'react';
import { renderWithProvider, leftClick } from './test-utils';
import PageHeader from 'components/Navigation/PageHeader';
import { Simulate } from 'react-dom/test-utils';
import { Path } from 'constants/routes';

test('Clicking the login button correctly changes URL', () => {
  const { getByText } = renderWithProvider(<PageHeader />);
  const LoginLink = getByText(/login \/ signup/i);

  expect(LoginLink).toBeDefined();

  Simulate.click(LoginLink, leftClick);

  expect(window.location.pathname).toMatch(Path.AUTH);
});

test('Clicking the checkout button correctly changes URL', () => {
  const { getByText } = renderWithProvider(<PageHeader />, {
    currentUser: { loggedIn: true, email: 'foobar@foobar.com', token: 'foobar' }
  });

  const CheckoutLink = getByText(/checkout/i);

  Simulate.click(CheckoutLink, leftClick);
  expect(window.location.pathname).toMatch(Path.CHECKOUT);
});

test('Navbar only shows login link when user is not logged in', () => {
  const { queryByText } = renderWithProvider(<PageHeader />, {
    currentUser: { loggedIn: true, email: 'foobar@foobar.com', token: 'foobar' }
  });

  const LoginLink = queryByText(/login \/ signup/i);
  expect(LoginLink).toBeNull();
});

test('Navbar shows Checkout link only when user is logged in', () => {
  const loggedOut = renderWithProvider(<PageHeader />);

  const unrendedCheckoutLink = loggedOut.queryByText(/checkout/i);
  expect(unrendedCheckoutLink).toBeNull();

  const loggedIn = renderWithProvider(<PageHeader />, {
    currentUser: { loggedIn: true, email: 'foobar@foobar.com', token: 'foobar' }
  });

  const CheckoutLink = loggedIn.getByText(/checkout/i);
  expect(CheckoutLink).not.toBeNull();
});
