import React from 'react'
import PropType from 'prop-types'
import { fancyTimeFormat } from './utils/time'

const MediaInfo = ({
  currentTime,
}, { store }) => {
  const {
    bpm,
    duration,
    loopTime,
    size
  } = store.getState().mediaInfo

  return (
    <div className="player__media-info">
      <div className="player__media-info--line">
        <div className="player__media-info--currentTime">{currentTime}</div>
        <div className="player__media-info--duration">{duration}</div>
      </div>
      <div className="player__media-info--line">
        <div className="player__media-info--bpm">BPM: {bpm} | Size: {size} | LoopTime: {fancyTimeFormat(loopTime)}</div>
      </div>
    </div>
  )
}

MediaInfo.contextTypes = {
  store: PropType.object
}

export default MediaInfo
