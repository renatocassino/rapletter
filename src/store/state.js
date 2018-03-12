export const cuePoint = {
  start: null,
  end: null,
  id: null
}

export const cuePoints = []

export const mediaInfo = {
  title: '',
  duration: null,
  bpm: null,
  size: 0,
  loopTime: 0,
  url: ''
}

export const song = {
  mediaInfo,
  cuePoints
}

export const player = {
  isPlaying: false,
  loopActive: false
}

export const playlist = {
  currentSong: 0,
  songs: []
}

export default {
  player,
  playlist
}
