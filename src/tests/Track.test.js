import React from 'react';
import ReactDOM from 'react-dom';
import Track from '../components/Track';
import { act } from 'react-dom/test-utils';
import mock_data from '../mock'

let container;
const sampleTrack = mock_data.items[0].track

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
    ReactDOM.render(<Track track={sampleTrack} />, container);
  });

  act(() => {
    ReactDOM.unmountComponentAtNode(container);
  })
});

it('shows proper track and artist names', () => {
  act(() => {
    ReactDOM.render(<Track track={sampleTrack} />, container);
  });

  const trackName = container.querySelector('.track-name');
  expect(trackName.textContent).toBe(sampleTrack.name);

  const artist = container.querySelector('.MuiTypography-subtitle1');
  expect(artist.textContent).toBe(sampleTrack.album.artists[0].name);
});
