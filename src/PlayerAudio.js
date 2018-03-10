import React, { Component } from 'react'
import PropType from 'prop-types'
import { Icon } from 'react-fa'
import { fancyTimeFormat } from './utils/time'
import MediaInfo from './MediaInfo'
import { MediaControl } from './MediaControl'
import getGlobal from './utils/getGlobal'
import {
  addCuePoint,
  setMediaInfo,
  setIsPlaying
} from './store/actions'
import LoaderAudio from './loaderAudio'
import CuePoints from './MediaControl/CuePoint'

import './PlayerAudio.css'

// const WaveSurfer = require('wavesurfer.js')

const idGenerator = function*() {
  let id = 0
  while(true)
    yield ++id
}

const getId = idGenerator()

class PlayerAudio extends Component {
  state = {
    shouldRender: false
  }

  constructor(props) {
    super(props)
    this.wavesurfer = {}
  }

  componentDidMount() {
    if(typeof window === 'undefined') return

    this.setState({ shouldRender: true })

    getGlobal('WaveSurfer').then((WaveSurfer) => {
      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        splitChannels: true,
        height: 64,
        barWidth: 0
      })

      const dispatch = this.context.store.dispatch

      this.wavesurfer.on('play', () => {
        dispatch(setIsPlaying(true))
      })

      this.wavesurfer.on('pause', () => {
        dispatch(setIsPlaying(false))
      })

      this.wavesurfer.on('stop', () => {
        dispatch(setIsPlaying())
      })

      this.wavesurfer.on('ready', () => {
        this.wavesurfer.play();

        const duration = this.wavesurfer.getDuration()
        dispatch(setMediaInfo({ duration: fancyTimeFormat(duration) }))
      });

      window.wavesurfer = this.wavesurfer
      setInterval(this.runEvents, 100)
    })
  }

  runEvents = () => {
    const newTime = fancyTimeFormat(this.wavesurfer.getCurrentTime())
    if(newTime !== this.state.currentTime) {
      this.setState({ currentTime: newTime })
    }

    // loop
    if (this.context.store.getState().mediaControl.loopActive) {
      this.context.store.getState().cuePoints.forEach((loop) => {
        const difference = this.wavesurfer.getCurrentTime() - loop.end
        if(difference > -0.05 && difference < 1) {
          const seekTo = (loop.start + difference) / this.wavesurfer.getDuration()
          this.wavesurfer.seekTo(seekTo)
        }
      })
    }
  }

  setLoop = () => {
    const currentTime = this.wavesurfer.getCurrentTime()

    const cuePoint = {
      id: getId.next().value,
      start: currentTime,
      end: currentTime + this.context.store.getState().mediaInfo.loopTime
    }

    this.context.store.dispatch(addCuePoint(cuePoint))
  }

  render() {
    if(!this.state.shouldRender) return <div><Icon spin name="spinner fa-4x" /></div>

    const {
      currentTime,
    } = this.state

    const {
      mediaInfo,
      cuePoints
    } = this.context.store.getState()

    return (
      <div className="player">
        <div className="player__title">{mediaInfo.title}</div>
        <div className="player__wave" id="waveform"></div>

        <MediaInfo
          currentTime={currentTime}
        />

        <MediaControl
          wavesurfer={this.wavesurfer}
        />

        <div style={{
          display: 'flex'
        }}>
          <CuePoints cuePoints={cuePoints} wavesurfer={this.wavesurfer} setLoop={this.setLoop} />
          <LoaderAudio wavesurfer={this.wavesurfer} />
        </div>
      </div>
    );
  }
}

PlayerAudio.contextTypes = {
  store: PropType.object
}

export default PlayerAudio
