import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'react-fa'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import { withState } from 'recompose'
import { lifecycle, compose, getContext } from 'recompose'
import { addLoop, toggleActive, deleteCuePoint } from './CuePoint'

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
  wavesurfer: PropTypes.object
}

MediaControl.contextTypes = {
  store: PropTypes.object
}

const enhance = compose(
  getContext({
    currentSong: PropTypes.object,
    store: PropTypes.object
  }, (props) => ({
    currentSong: props.currentSong,
    store: props.store
  })),
  lifecycle({
    componentDidMount() {
      if(typeof window === 'undefined') return

      document.addEventListener('keydown', (ev) => {
        const KEY_1 = 49
        const KEY_A = 65
        const KEY_D = 68
        const KEY_L = 76
        const KEY_N = 78
        const KEY_P = 80
        const KEY_RIGHT = 39
        const KEY_LEFT = 37
        const KEY_SPACE = 32
        const KEY_ENTER = 13

        if(ev.which >= KEY_1 && ev.which <= KEY_1+8) {

          const codeKey = ev.which - KEY_1
          const { cuePoints } = this.props.currentSong

          if(codeKey >= cuePoints.length) return
          const cuePoint = cuePoints[codeKey]

          if(ev.shiftKey) {
            deleteCuePoint(this.props.store, cuePoint, this.props.wavesurfer)
            return
          }

          const seekTo = cuePoint.start / this.props.wavesurfer.getDuration()
          this.props.wavesurfer.seekTo(seekTo)
          return
        }

        if(ev.which === KEY_L) {
          toggleActive(this.props.store, this.props.wavesurfer)
          return
        }

        if(ev.which === KEY_N) {
          addLoop(this.props.store, this.props.wavesurfer, this.props.currentSong)
          return
        }

        if(ev.which === KEY_SPACE || ev.which === KEY_P) {
          ev.preventDefault()
          this.props.wavesurfer.playPause()
        }

        if(ev.which === KEY_LEFT || ev.which === KEY_A) {
          this.props.wavesurfer.skip(-5)
        }

        if(ev.which === KEY_RIGHT || ev.which === KEY_D) {
          this.props.wavesurfer.skip(5)
        }

        if(ev.which === KEY_ENTER) {
          this.props.wavesurfer.stop()
        }
      })
    }
  })
)

export default enhance(MediaControl)
