import React, { Component } from 'react'
import PropType from 'prop-types'
import { fancyTimeFormat } from './utils/time'
import MediaInfo from './MediaInfo'
import { MediaControl } from './MediaControl'
import Playlist from './Playlist'
import Spinner from './components/Spinner'
import getGlobal from './utils/getGlobal'
import {
  setMediaInfo,
  setIsPlaying
} from './store/actions'
import LoaderAudio from './LoaderAudio'
import CuePoints from './MediaControl/CuePoint'

import './PlayerAudio.css'

// const WaveSurfer = require('wavesurfer.js')

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

    const dispatch = this.context.store.dispatch

    getGlobal('WaveSurfer').then((WaveSurfer) => {
      this.setState({ shouldRender: true })

      this.wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        splitChannels: true,
        height: 64,
        barWidth: 0
      })

      this.wavesurfer.on('play', () => {
        dispatch(setIsPlaying(true))
      })

      this.wavesurfer.on('pause', () => {
        dispatch(setIsPlaying(false))
      })

      this.wavesurfer.on('stop', () => {
        dispatch(setIsPlaying(false))
      })

      this.wavesurfer.on('ready', () => {
        this.wavesurfer.play();

        const duration = this.wavesurfer.getDuration()
        dispatch(setMediaInfo({ duration: fancyTimeFormat(duration) }))
      })

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
    if (this.context.store.getState().player.loopActive) {
      this.context.currentSong.cuePoints.forEach((loop) => {
        const difference = this.wavesurfer.getCurrentTime() - loop.end
        if(difference > -0.05 && difference < 1) {
          const seekTo = (loop.start + difference) / this.wavesurfer.getDuration()
          this.wavesurfer.seekTo(seekTo)
        }
      })
    }
  }

  render() {
    if(!this.state.shouldRender) return <Spinner />

    const state = this.context.store.getState()
    const { currentSong } = this.context

    const {
      currentTime,
    } = this.state

    const {
      mediaInfo
    } = currentSong

    const { cuePoints } = state

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
          <CuePoints cuePoints={cuePoints} wavesurfer={this.wavesurfer} />
          <div style={{ flexGrow: '4' }}>
            <LoaderAudio wavesurfer={this.wavesurfer} />
            <Playlist wavesurfer={this.wavesurfer} />
          </div>
        </div>
      </div>
    )
  }
}

PlayerAudio.contextTypes = {
  store: PropType.object,
  currentSong: PropType.object
}

export default PlayerAudio
