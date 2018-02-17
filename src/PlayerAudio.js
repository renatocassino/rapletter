import React, { Component } from 'react';
import detect from 'bpm-detective';
import {Icon} from 'react-fa'

import './PlayerAudio.css'

function fancyTimeFormat(time)
{
  // Hours, minutes and seconds
  var hrs = Math.floor(time / 3600);
  var mins = Math.floor((time % 3600) / 60);
  var secs = time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  if (mins < 10) {
    mins = `0${mins}`
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

class PlayerAudio extends Component {
  state = {
    shouldRender: false,
    bpm: null,
    zoom: 1,
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

    if(typeof window.WaveSurfer !== 'undefined') {
      setTimeout(() => {
        this.setState({shouldRender: true})
        let wavesurfer = window.WaveSurfer.create({
          container: '#waveform',
          waveColor: 'violet',
          progressColor: 'purple',
          splitChannels: true,
          height: 64,
          barWidth: 2
        })

        wavesurfer.on('play', () => {
          this.setState({ isPlaying: true })
        })

        wavesurfer.on('pause', () => {
          this.setState({ isPlaying: false })
        })

        wavesurfer.on('stop', () => {
          this.setState({ isPlaying: false })
        })

        this.wavesurfer = wavesurfer

        wavesurfer.on('ready', () => {
          wavesurfer.play();

          this.setState({ duration: fancyTimeFormat(parseInt(wavesurfer.getDuration())) })
        });

        setInterval(() => {
          const newTime = fancyTimeFormat(parseInt(this.wavesurfer.getCurrentTime()))
          if(newTime != this.state.currentTime) {
            this.setState({ currentTime: newTime })
          }
        }, 100)

        window.wavesurfer = wavesurfer
      }, 1000)
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

  moreZoom = () => {
    this.setState({
      zoom: this.state.zoom + 10
    })

    this.wavesurfer.zoom(this.state.zoom)
  }

  lessZoom = () => {
    this.setState({
      zoom: this.state.zoom - 10
    })

    this.wavesurfer.zoom(this.state.zoom)
  }

  loop = () => {
    const bpm = parseInt(this.state.bpm || 0)
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
          {this.state.isPlaying ?
            <button onClick={() => this.wavesurfer.pause()}><Icon name="pause" /></button> :
            <button onClick={() => this.wavesurfer.play()}><Icon name="play" /></button>
          }
          <button onClick={() => this.wavesurfer.stop()}><Icon name="stop" /></button>
          <button onClick={() => this.moreZoom()}><Icon name="search-plus" /></button>
          <button onClick={() => this.lessZoom()}><Icon name="search-minus" /></button>
          <button onClick={() => this.setLoop()} style={{background: this.state.loopActive ? 'rgba(0, 255, 0, 0.6)' : null}}><Icon name="retweet" /></button>
        </div>
        <input type="file" id="mediaFile" onChange={this.setNewSong} />
      </div>
    );
  }
}

export default PlayerAudio;
