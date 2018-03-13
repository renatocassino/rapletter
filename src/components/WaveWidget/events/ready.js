import { cuePointToRegion } from '../convert'

export function ready() {
  const { store } = this.props
  const state = store.getState()
  if(state.playlist.songs.length === 0) return

  const wavesurfer = window.wavesurfer
  wavesurfer.clearRegions()
  const cuePoints = state.playlist.songs[state.playlist.currentSong].cuePoints

  for(let i = 0; i < cuePoints.length; i++) {
    const cuePoint = cuePoints[i]

    const region = Object.assign({}, cuePointToRegion(cuePoint), {
      attributes: {
        ignoreEvents: true
      }
    })
    wavesurfer.addRegion(region)
  }

  wavesurfer.play()
}
