import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { act } from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  })
});

it('renders login button', () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const loginButton = container.querySelector('.login-btn');
  expect(loginButton).toBeTruthy();
  expect(loginButton.textContent).toBe('Login with Spotify');
});
