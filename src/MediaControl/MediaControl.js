import React from 'react'
import PropType from 'prop-types'
import { Icon } from 'react-fa'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'

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
