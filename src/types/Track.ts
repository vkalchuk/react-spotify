export interface iTrack {
  id: string;
  name: string;
  artists: any[];
  album: iAlbum,
  selected: boolean
}

interface iAlbum {
  images: iAlbumImage[]
}

interface iAlbumImage {
  height: number,
  url: string,
  width: number
}
