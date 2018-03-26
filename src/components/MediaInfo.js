import React from 'react'
import PropTypes from 'prop-types'
import { fancyTimeFormat } from '../utils/time'

const MediaInfo = ({
  currentTime,
}, { currentSong }) => {

  const {
    bpm,
    duration,
    loopTime
  } = currentSong.mediaInfo

  return (
    <div className="player__media-info">
      <div className="player__media-info--line">
        <div className="player__media-info--currentTime">{currentTime}</div>
        <div className="player__media-info--duration">{duration}</div>
      </div>
      <div className="player__media-info--line">
        <div className="player__media-info--bpm">BPM: {bpm} | LoopTime: {fancyTimeFormat(loopTime)}</div>
      </div>
    </div>
  )
}

MediaInfo.propTypes = {
  currentTime: PropTypes.any
}

MediaInfo.contextTypes = {
  currentSong: PropTypes.object
}

export default MediaInfo
