import React from 'react';
import Spotify from '../../service/Spotify'
import mock_data from '../../mock'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import './Tracklist.scss'
import Button from '@material-ui/core/Button';
import Track from '../Track'
import { iTrack } from '../../types/Track'


@observer
class Tracklist extends React.Component {
  @observable topTracks: iTrack[] = []
  @observable error: string = ''
  @observable recommendedTracks: iTrack[] = []

  componentDidMount() {
    Spotify.getTopTracks()
      .then(res => res.json())
      .then(tracksResponse => {
        console.log(tracksResponse)
        if (!tracksResponse.error) {
          console.log('tracks response', tracksResponse.items)
          // get top 5 tracks
          this.topTracks = tracksResponse.items.slice(0, 5)

          // mock tracks if 0 length
          if (!tracksResponse.items.length) {
            tracksResponse.items = mock_data.items.slice(0, 5)

            this.topTracks = tracksResponse.items
            console.log('mocked tracks', tracksResponse.items.slice(0, 5))
          }
        } else {
          this.error = tracksResponse.error.message
        }
      })
  }

  handleTrackClick(track: iTrack) {
    track.selected = !track.selected
  }

  shouldShowRecommendationsButton(): boolean {
    return this.topTracks.some(track => track.selected)
  }

  getRecommendations() {
    const selectedIDs = this.topTracks.filter(track => track.selected).map(selectedTrack => selectedTrack.id).join(',')
    console.log(selectedIDs)

    Spotify.getRecommendationsOnTracks(selectedIDs)
      .then(res => res.json())
      .then(data => {
        if (data.tracks) {
          this.recommendedTracks = data.tracks
          console.log('getRecommendationsOnTracks', data)
        }
      })
  }

  render () {
    return (
      <div className='Tracklist'>
        {this.error && <h1>{this.error}</h1>}

        {
          this.topTracks.length ?
          <>
            <h1>Your top tracks!</h1>
            <div className="top-tracks-container">
              {this.topTracks.map(track => <Track
                  key={track.id}
                  onTrackClick={this.handleTrackClick}
                  isSelected={track.selected}
                  track={track}
              />)}
            </div>
          </> :
          null
        }

        {this.shouldShowRecommendationsButton() && <Button
            className='recommended-btn'
            onClick={() => this.getRecommendations()}
            variant="contained"
            color="primary"
        >
          Get Recommendations
        </Button>}

        {
          this.recommendedTracks.length ?
          <>
            <h1>Recommended listening</h1>
            {this.recommendedTracks.map(track => <Track
                className='recommended'
                key={track.id}
                track={track} />)}
          </> :
          null
        }

      </div>
    );
  }

}

export default Tracklist;
