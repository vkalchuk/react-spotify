import React from 'react';
import ReactDOM from 'react-dom';
import { Tracklist } from '../components/Tracklist';
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
    ReactDOM.render(<Tracklist />, container);
  });

  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  })
});

