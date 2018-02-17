import React, { Component } from 'react'
import detect from 'bpm-detective'
import { Icon } from 'react-fa'
import { fancyTimeFormat } from './utils/time'

import PlayPause from './button/PlayPause'

import './PlayerAudio.css'

const WaveSurfer = require('wavesurfer.js')

class PlayerAudio extends Component {
  state = {
    shouldRender: false,
    bpm: null,
    loopActive: false,
    isPlaying: false,
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

        this.setState({ duration: fancyTimeFormat(parseInt(this.wavesurfer.getDuration())) })
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
      const bpm = parseInt(this.state.bpm || 0)
      const loopTime = 60*8/bpm

      this.wavesurfer.skip(loopTime*-1)

      setTimeout(this.myLoop.bind(this), loopTime*1000)
    }
  }

  loop = () => {
    const bpm = parseInt(this.state.bpm || 1)
    const loopTime = 60*8/bpm

    this.wavesurfer.skip(loopTime*-1)
  }

  setLoop = () => {
    const newState = !this.state.loopActive
    this.setState({loopActive: newState})

    setTimeout(this.myLoop.bind(this), 300)
  }

  render() {
    if(!this.state.shouldRender) return <div><Icon spin name="spinner fa-4x" /></div>

    return (
      <div className="player">
        <div className="player__title">{this.state.title}</div>
        <div className="player__wave" id="waveform"></div>

        <div className="player__media-info">
          <div className="player__media-info--line">
            <div className="player__media-info--currentTime">{this.state.currentTime}</div>
            <div className="player__media-info--duration">{this.state.duration}</div>
          </div>
          <div className="player__media-info--line">
            <div className="player__media-info--bpm">BPM: {this.state.bpm} | Size: {this.state.size}</div>
          </div>
        </div>

        <div className="player__media-control">
        <PlayPause isPlaying={this.state.isPlaying} onClick={() => {
            (this.state.isPlaying) ? this.wavesurfer.pause() : this.wavesurfer.play()
          }} />
          <button onClick={() => this.wavesurfer.stop()}><Icon name="stop" /></button>
          <button onClick={() => this.setLoop()} style={{background: this.state.loopActive ? 'rgba(0, 255, 0, 0.6)' : null}}>
            <Icon name="retweet" />
          </button>
        </div>

        <div>
          <input id="slider" type="range" min="1" max="200" defaultValue="1" style={{ width: '100%' }} onInput={(ev) => {
              var zoomLevel = Number(ev.target.value);
              this.wavesurfer.zoom(zoomLevel);
          }} />
        </div>

        <input type="file" id="mediaFile" onChange={this.setNewSong} />
      </div>
    );
  }
}

export default PlayerAudio
