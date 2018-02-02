import React, { Component } from 'react';
import detect from 'bpm-detective';
import {Icon} from 'react-fa'

import './PlayerAudio.css'

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
      console.log(arrayBuffer);
      console.log(arrayBuffer.byteLength);

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
        })
        wavesurfer.on('play', () => {
          this.setState({isPlaying: true})
        })

        wavesurfer.on('pause', () => {
          this.setState({isPlaying: false})
        })

        wavesurfer.on('stop', () => {
          this.setState({isPlaying: false})
        })

        this.wavesurfer = wavesurfer

        wavesurfer.on('ready', function () {
          wavesurfer.play();
        });

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
        <div className="player__wave" id="waveform"></div>
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

        <div>BPM: {this.state.bpm}</div>

        <input type="file" id="mediaFile" onChange={this.setNewSong} />
      </div>
    );
  }
}

export default PlayerAudio;
