import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { iTrack } from '../../types/Track'

type TrackProps = {
  track: iTrack,
  onTrackClick?: (track: iTrack) => void,
  isSelected?: boolean,
  className?: string
}

export default class Track extends Component<TrackProps, {}> {

  getArtist(track: iTrack): string {
    return track.artists[0].name
  }

  getAlbumImage(track: iTrack):string {
    // get pre last image from album (moderate quality)
    return track.album.images.slice(-2)[0].url
  }

  render() {
    const { track, onTrackClick, isSelected, className } = this.props

    return (
      <Card onClick={onTrackClick && (() => onTrackClick(track))} key={track.id}
        className={`Track card ${className ? className : ''} ${isSelected ? 'selected' : ''}`}>
        <div className='details'>
          <CardContent className='content'>
            <Typography className='track-name' component="h5" variant="h5">
              {track.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {this.getArtist(track)}
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className='cover'
          image={this.getAlbumImage(track)}
          title="album cover"
        />
      </Card>
    )
  }
}
