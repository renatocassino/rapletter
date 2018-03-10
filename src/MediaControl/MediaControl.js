import React from 'react'
import PropType from 'prop-types'
import { Icon } from 'react-fa'
import PlayPause from '../button/PlayPause'

const MediaControl = ({
  wavesurfer = {}
}, { store }) => {
  const { isPlaying } = store.getState().player

  return (
    <React.Fragment>
      <div className="player__media-control">
        <PlayPause isPlaying={isPlaying} onClick={() => wavesurfer.playPause()} />
        <button onClick={() => wavesurfer.stop()}><Icon name="stop" /></button>
      </div>
      <div className="">
        <input type="range" min="1" max="200" defaultValue="1" style={{ width: '100%' }} onInput={(ev) => {
          var zoomLevel = Number(ev.target.value)
          wavesurfer.zoom(zoomLevel)
        }} />
      </div>
    </React.Fragment>
  )
}

MediaControl.propTypes = {
  wavesurfer: PropType.object,
}

MediaControl.contextTypes = {
  store: PropType.object
}

export default MediaControl
