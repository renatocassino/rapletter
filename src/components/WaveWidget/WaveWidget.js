import React from 'react'
import PropTypes from 'prop-types'
import { compose, lifecycle, getContext } from 'recompose'
import { wavesurferSettings } from './settings'
import { play, pause, stop, ready, regionCreated, regionUpdated } from './events'

const WaveWidget = () => (
  <div className="player__wave" id="waveform"></div>
)

WaveWidget.contextTypes = {
  store: PropTypes.object
}

const enhance = compose(
  getContext({ store: PropTypes.object }),
  lifecycle({
    componentDidMount() {
      const wavesurfer = window.WaveSurfer.create(wavesurferSettings)

      wavesurfer.on('play', play.bind(this))
      wavesurfer.on('pause', pause.bind(this))
      wavesurfer.on('stop', stop.bind(this))
      wavesurfer.on('ready', ready.bind(this))
      wavesurfer.on('region-created', regionCreated.bind(this))
      //wavesurfer.on('region-updated', regionUpdated.bind(this))

      window.wavesurfer = wavesurfer
    }
  })
)

export default enhance(WaveWidget)
