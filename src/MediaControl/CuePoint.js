import React from 'react'
import PropType from 'prop-types'
import { fancyTimeFormat } from '../utils/time'
import { Icon } from 'react-fa'
import { addCuePoint, removeCuePoint, toggleActiveLoop } from '../store/actions'
import getId from '../utils/idGenerator'

import './CuePoint.css'

const CuePoint = ({
  cuePoint,
  wavesurfer
}, { store }) => (
  <a className="cue-point__point">
    <div className="cue-point__column">
      <button onClick={() => {
        const seekTo = cuePoint.start / wavesurfer.getDuration()
        wavesurfer.seekTo(seekTo)
      }}>
        <Icon name="play" />
      </button>
    </div>
    <div className="cue-point__timers">
      <input type="time" readOnly value={fancyTimeFormat(cuePoint.start || 0)} />
      <input type="time" readOnly value={fancyTimeFormat(cuePoint.end || 0)} />
    </div>
    <Icon
      name="minus"
      className="cue-point__btn-close"
      onClick={() => store.dispatch(removeCuePoint(cuePoint.id))}
    />
  </a>
)

CuePoint.protoTypes = {
  cuePoint: PropType.shape({
    start: PropType.string,
    end: PropType.string,
    id: PropType.integer
  }),
  wavesurfer: PropType.object
}

CuePoint.contextTypes = {
  store: PropType.shape({
    dispatch: PropType.func
  })
}

const setLoop = (store, wavesurfer, currentSong) => {
  const currentTime = wavesurfer.getCurrentTime()

  const cuePoint = {
    id: getId.next().value,
    start: currentTime,
    end: currentTime + currentSong.mediaInfo.loopTime
  }

  store.dispatch(addCuePoint(cuePoint))
}

const CuePoints = ({ cuePoints, wavesurfer }, { store, currentSong }) => (
  <div className="cue-point">
    <div className="cue-point__control">
      <span>CuePoints</span>
      <button onClick={() => store.dispatch(toggleActiveLoop())} style={{ background: store.getState().player.loopActive ? 'rgba(0, 255, 0, 0.6)' : null }}>
        <Icon name="retweet" />
      </button>
      <button onClick={() => setLoop(store, wavesurfer, currentSong)}><Icon name="plus" /></button>
    </div>
    <div className="cue-point__points-area">
      {currentSong.cuePoints.map((cuePoint) => (
        <CuePoint
          key={cuePoint.id}
          cuePoint={cuePoint}
          wavesurfer={wavesurfer} />
      ))}
    </div>
  </div>
)

CuePoints.contextTypes = {
  store: PropType.shape({
    dispatch: PropType.func,
    getState: PropType.func
  }),
  currentSong: PropType.object
}

export default CuePoints
