import React, { Component } from 'react'
import PropType from 'prop-types'
import { fancyTimeFormat } from './utils/time'
import MediaInfo from './components/MediaInfo'
import { MediaControl } from './MediaControl'
import Playlist from './components/Playlist'
import Spinner from './components/Spinner'
import WaveWidget from './components/WaveWidget/WaveWidget'
import LoaderAudio from './components/LoaderAudio'
import CuePoints from './MediaControl/CuePoint'
import getGlobal from './utils/getGlobal'

import './PlayerAudio.css'

class PlayerAudio extends Component {
  state = {
    shouldRender: false
  }

  runEvents = () => {
    const newTime = fancyTimeFormat(window.wavesurfer.getCurrentTime())
    if(newTime !== this.state.currentTime) {
      this.setState({ currentTime: newTime })
    }
  }

  componentDidMount() {
    if(typeof window === 'undefined') return
    getGlobal('WaveSurfer').then((WaveSurfer) => {
      this.setState({ shouldRender: true })
      setInterval(this.runEvents, 400)
    })
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

    const wavesurfer = window.wavesurfer

    return (
      <div className="player">
        <div className="player__title">{mediaInfo.title}</div>
        <WaveWidget />

        <MediaInfo
          currentTime={currentTime}
        />

        <MediaControl
          wavesurfer={wavesurfer}
        />

        <div style={{
          display: 'flex'
        }}>
          <CuePoints wavesurfer={wavesurfer} />
          <div style={{ flexGrow: '4' }}>
            <LoaderAudio wavesurfer={wavesurfer} />
            <Playlist wavesurfer={wavesurfer} />
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
