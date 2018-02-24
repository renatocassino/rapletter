import React, { Component } from 'react'
import PropType from 'prop-types'
import detect from 'bpm-detective'
import { Icon } from 'react-fa'
import { fancyTimeFormat } from './utils/time'
import MediaInfo from './MediaInfo'
import MediaControl from './MediaControl'
import getGlobal from './utils/getGlobal'
import { addCuePoint } from './store/actions'

import './PlayerAudio.css'

// const WaveSurfer = require('wavesurfer.js')

const getId = function*() {
  let id = 0
  while(true)
    yield id++
}

class PlayerAudio extends Component {
  state = {
    shouldRender: false,
    bpm: null,
    loopActive: false,
    isPlaying: false,
    loopTime: null
  }

  constructor(props) {
    super(props)
    this.wavesurfer = {}
  }

  setNewSong = (ev) => {
    /** Getting BPM */
    var fileReader  = new FileReader();
    const self = this

    fileReader.onload = function() {
      var arrayBuffer = this.result;
      self.setState({ size: (arrayBuffer.byteLength / 1024 / 1024).toFixed(2).toString().replace('.', ',') + 'MB' });

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      let context = new AudioContext();

      new Promise((resolve, reject) => {
        context.decodeAudioData(arrayBuffer, resolve, reject)
      }).then(buffer => {
        try {
          const bpm = detect(buffer);
          const loopTime = 60*8/bpm
          self.setState({ bpm, loopTime })
        } catch (err) {
          console.error(err);
        }
      })
    }

    this.setState({ title: ev.target.value.split(/(\\|\/)/g).pop() })

    fileReader.readAsArrayBuffer(ev.target.files[0]);
    var url = URL.createObjectURL(ev.target.files[0]);
    this.wavesurfer.load(url)
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
        barWidth: 2
      })

      this.wavesurfer.on('play', () => {
        this.setState({ isPlaying: true })
      })

      this.wavesurfer.on('pause', () => {
        this.setState({ isPlaying: false })
      })

      this.wavesurfer.on('stop', () => {
        this.setState({ isPlaying: false })
      })

      this.wavesurfer.on('ready', () => {
        this.wavesurfer.play();

        const duration = this.wavesurfer.getDuration()
        this.setState({ duration: fancyTimeFormat(duration) })
      });

      setInterval(this.runEvents, 100)
    })
  }

  runEvents = () => {
    const newTime = fancyTimeFormat(this.wavesurfer.getCurrentTime())
    if(newTime !== this.state.currentTime) {
      this.setState({ currentTime: newTime })
    }

    // loop
    if (this.state.loopActive) {
      this.context.store.getState().cuePoints.forEach((loop) => {
        const difference = this.wavesurfer.getCurrentTime() - loop.end
        if(difference > -0.05 && difference < 1) {
          const seekTo = (loop.start + difference) / this.wavesurfer.getDuration()
          this.wavesurfer.seekTo(seekTo)
        }
      })
    }
  }

  togleLoop = () => {
    this.setState({
      loopActive: !this.state.loopActive
    })
  }

  setLoop = () => {
    const currentTime = this.wavesurfer.getCurrentTime()

    const cuePoint = {
      id: getId().next(),
      start: currentTime,
      end: currentTime + this.state.loopTime
    }

    this.context.store.dispatch(addCuePoint(cuePoint))
  }

  render() {
    if(!this.state.shouldRender) return <div><Icon spin name="spinner fa-4x" /></div>

    const {
      currentTime,
      duration,
      bpm,
      size,
      isPlaying,
      loopActive,
      loopTime,
    } = this.state

    return (
      <div className="player">
        <div className="player__title">{this.state.title}</div>
        <div className="player__wave" id="waveform"></div>

        <MediaInfo
          currentTime={currentTime}
          duration={duration}
          bpm={bpm}
          size={size}
          loopTime={loopTime}
        />

        <MediaControl
          isPlaying={isPlaying}
          loopActive={loopActive}
          setLoop={this.setLoop.bind(this)}
          wavesurfer={this.wavesurfer}
          togleLoop={this.togleLoop}
        />

        <input type="file" id="mediaFile" onChange={this.setNewSong} />
      </div>
    );
  }
}

PlayerAudio.contextTypes = {
  store: PropType.object
}

export default PlayerAudio
