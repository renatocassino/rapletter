import React from 'react'

const MediaInfo = ({
  currentTime,
  duration,
  bpm,
  size
}) => (
  <div className="player__media-info">
    <div className="player__media-info--line">
      <div className="player__media-info--currentTime">{currentTime}</div>
      <div className="player__media-info--duration">{duration}</div>
    </div>
    <div className="player__media-info--line">
      <div className="player__media-info--bpm">BPM: {bpm} | Size: {size}</div>
    </div>
  </div>
)

export default MediaInfo
