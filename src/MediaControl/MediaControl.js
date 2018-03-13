import React from 'react'
import PropType from 'prop-types'
import { Icon } from 'react-fa'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import { withState } from 'recompose'

const volumes = [
  {value: 0, icon: 'off'},
  {value: 0.5, icon: 'down'},
  {value: 1, icon: 'up'}
]

const VolumeButton = withState('volume', 'setVolume', 2)(({
  volume,
  setVolume
}) => {
  const currentVolume = volumes[volume]

  return (
    <RaisedButton onClick={() => {
      const newIdxVolume = volume+1 >= volumes.length ? 0 : volume+1
      const newVolume = volumes[newIdxVolume]
      window.wavesurfer.setVolume(newVolume.value)
      setVolume(newIdxVolume)
    }}>
      <Icon name={`volume-${currentVolume.icon}`} />
    </RaisedButton>
  )
})

const MediaControl = ({
  wavesurfer = {}
}, { store }) => {
  const { isPlaying } = store.getState().player

  return (
    <React.Fragment>
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton onClick={() => wavesurfer.playPause()}><Icon name={isPlaying ? 'pause' : 'play'} /></RaisedButton>
          <RaisedButton onClick={() => wavesurfer.stop()}><Icon name="stop" /></RaisedButton>
          <VolumeButton />
        </ToolbarGroup>
      </Toolbar>
      <Slider
        min={1} max={200}
        onChange={(ev, value) => {
          var zoomLevel = Number(value)
          wavesurfer.zoom(zoomLevel)
        }}
      />
    </React.Fragment>
  )
}

MediaControl.propTypes = {
  wavesurfer: PropType.object
}

MediaControl.contextTypes = {
  store: PropType.object
}

export default MediaControl
