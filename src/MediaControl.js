import React from 'react'
import PropType from 'prop-types'
import { Icon } from 'react-fa'
import PlayPause from './button/PlayPause'
import { fancyTimeFormat } from './utils/time'
import { removeCuePoint, toggleActiveLoop } from './store/actions'

const MediaControl = ({
  isPlaying,
  wavesurfer,
  setLoop
}, { store }) => (
  <React.Fragment>
    <div className="player__media-control">
      <PlayPause isPlaying={isPlaying} onClick={() => wavesurfer.playPause()} />
      <button onClick={() => wavesurfer.stop()}><Icon name="stop" /></button>
      <button onClick={() => store.dispatch(toggleActiveLoop())} style={{ background: store.getState().mediaControl.loopActive ? 'rgba(0, 255, 0, 0.6)' : null }}>
        <Icon name="toggle-on" />
      </button>
      <button onClick={() => setLoop()}><Icon name="retweet" /></button>
    </div>
    <div className="">
      <input type="range" min="1" max="200" defaultValue="1" style={{ width: '100%' }} onInput={(ev) => {
        var zoomLevel = Number(ev.target.value)
        wavesurfer.zoom(zoomLevel)
      }} />
    </div>

    {store.getState().cuePoints.map((cuePoint) => (
      <div key={cuePoint.id}>
        <input type="text" readOnly value={fancyTimeFormat(cuePoint.start || 0)} />
        <input type="text" readOnly value={fancyTimeFormat(cuePoint.end || 0)} />
        <button onClick={() => store.dispatch(removeCuePoint(cuePoint.id))}>
          <Icon name="times" />
        </button>
      </div>
    ))}
  </React.Fragment>
)

MediaControl.contextTypes = {
  store: PropType.object
}

export default MediaControl
