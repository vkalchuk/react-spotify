import React from 'react';
import './Tracklist.css';
import Spotify from '../../service/Spotify'
import mock_data from '../../mock'
import { observer } from 'mobx-react';
import { observable } from 'mobx';

interface Track {
  id: string;
  name: string;
  artists: any[];
}

@observer
class Tracklist extends React.Component {
  @observable topTracks: Track[] = []

  componentDidMount() {
    Spotify.getTopTracks()
      .then(res => res.json())
      .then(tracksResponse => {
        console.log(tracksResponse)

        // mock tracks if 0 length
        if (!tracksResponse.items.length) {
          tracksResponse.items = mock_data.items

          console.log(tracksResponse)
          this.topTracks = tracksResponse.items
        }
      })
  }

  render () {
    return (
      <div className='Tracklist'>
        { this.topTracks.map(track => {
          return <p key={track.id}>{track.name}</p>
        }) }
      </div>
    );
  }

}

export default Tracklist;
