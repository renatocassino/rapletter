export const cuePoint = {
  start: null,
  end: null,
  id: null
}

export const mediaInfo = {
  title: '',
  duration: null,
  bpm: null,
  size: 0,
  loopTime: 0
}

export const mediaControl = {
  loopActive: false
}

export const song = {
  mediaInfo,
  mediaControl,
  cuePoints: []
}

export const player = {
  isPlaying: false,
}

export const songs = []

export default {
  player,
  songs,
  mediaInfo,
  cuePoints: []
}
