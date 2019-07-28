import { getToken } from '../utils'

const API_URL = 'https://api.spotify.com/v1'

const getAuthHeaders = () => {
  const headers = new Headers()

  headers.append('Authorization', `Bearer ${getToken()}`)

  return { headers }
}

class Spotify {

  static getTopTracks(): Promise<Response> {
    return fetch(`${API_URL}/me/top/tracks`, getAuthHeaders())
  }

  // Comma separated list of Spotify IDs for a seed track.
  // Up to 5 seed values may be provided.
  static getRecommendationsOnArtists(tracks: string[]): Promise<Response> {
    return fetch(`${API_URL}/recommendations?seed_tracks=${tracks}`, getAuthHeaders())
  }
}

export default Spotify