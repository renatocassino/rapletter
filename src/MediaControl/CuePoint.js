import React from 'react'
import PropType from 'prop-types'
import { fancyTimeFormat } from '../utils/time'
import { Icon } from 'react-fa'
import { removeCuePoint, toggleActiveLoop } from '../store/actions'
import IconButton from 'material-ui/IconButton'
import { colorGenerator } from '../utils/colorGenerator'
import './CuePoint.css'

const deleteCuePoint = (store, cuePoint, wavesurfer) => {
  store.dispatch(removeCuePoint(cuePoint.id))
  wavesurfer.regions.list[cuePoint.id].remove()
}

const addLoop = (store, wavesurfer, currentSong) => {
  const currentTime = wavesurfer.getCurrentTime()
  const endTime = currentTime + currentSong.mediaInfo.loopTime

  wavesurfer.addRegion({
    start: currentTime,
    end: endTime,
    color: colorGenerator(),
    loop: store.getState().player.loopActive,
    drag: false
  })
}

const toggleActive = (store, wavesurfer) => {
  store.dispatch(toggleActiveLoop())

  if(!wavesurfer.regions.list) return
  for(let regionId in wavesurfer.regions.list) {
    const region = wavesurfer.regions.list[regionId]
    region.loop = store.getState().player.loopActive
  }
}

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
      onClick={() => deleteCuePoint(store, cuePoint, wavesurfer)}
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

const CuePoints = ({ wavesurfer }, { store, currentSong }) => (
  <div className="cue-point">
    <div className="cue-point__control">
      <span>CuePoints</span>
      <IconButton
        tooltip="Active loops"
        onClick={() => toggleActive(store, wavesurfer)}
        style={{ color: store.getState().player.loopActive ? 'rgba(0, 100, 0, 0.6)' : null, fontSize: '20px' }}
      >
        <Icon name="retweet" />
      </IconButton>

      <IconButton
        tooltip="Add cuepoint"
        onClick={() => addLoop(store, wavesurfer, currentSong)}
        style={{fontSize: '20px'}}
      >
        <Icon name="plus" />
      </IconButton>
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
