import React, { Component } from 'react'
import detect from 'bpm-detective'
import { Icon } from 'react-fa'
import { fancyTimeFormat } from './utils/time'
import MediaInfo from './MediaInfo'
import MediaControl from './MediaControl'

import './PlayerAudio.css'

const WaveSurfer = require('wavesurfer.js')

class PlayerAudio extends Component {
  state = {
    shouldRender: false,
    bpm: null,
    loopActive: false,
    isPlaying: false,
    loops: [],
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
      self.setState({ size: (arrayBuffer.byteLength / 1024 / 1024).toFixed(2).toString().replace('.',',') + 'MB' });

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      let context = new AudioContext();

      new Promise((resolve, reject) => {
        context.decodeAudioData(arrayBuffer, resolve, reject)
      }).then(buffer => {
        try {
          const bpm = detect(buffer);
          self.setState({ bpm })
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

    setTimeout(() => {
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
    }, 1000)
  }

  runEvents = () => {
    const newTime = fancyTimeFormat(this.wavesurfer.getCurrentTime())
    if(newTime !== this.state.currentTime) {
      this.setState({ currentTime: newTime })
    }
  }

  myLoop = () => {
    if(this.state.loopActive) {
      const bpm = parseInt(this.state.bpm || 0, 10)
      const loopTime = 60*8/bpm

      this.wavesurfer.skip(loopTime*-1)

      setTimeout(this.myLoop.bind(this), loopTime*1000)
    }
  }

  setLoop = () => {
    const newState = !this.state.loopActive
    this.setState({loopActive: newState})

    setTimeout(this.myLoop.bind(this), 300)
  }

  render() {
    if(!this.state.shouldRender) return <div><Icon spin name="spinner fa-4x" /></div>

    const {
      currentTime,
      duration,
      bpm,
      size,
      isPlaying,
      loopActive
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
        />

        <MediaControl
          isPlaying={isPlaying}
          loopActive={loopActive}
          setLoop={this.setLoop.bind(this)}
          wavesurfer={this.wavesurfer} />

        <input type="file" id="mediaFile" onChange={this.setNewSong} />
      </div>
    );
  }
}

export default PlayerAudio
