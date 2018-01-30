import React, { Component } from 'react';
import detect from 'bpm-detective';


class PlayerAudio extends Component {
  state = {
    shouldRender: false,
    bpm: null,
    zoom: 1,
    loopActive: false
  }

  constructor(props) {
    super(props)
    this.wavesurfer = {}
  }

  componentDidMount() {
    if(typeof window === 'undefined') return
    if(typeof window.WaveSurfer !== 'undefined') {
      this.setState({shouldRender: true})

      setTimeout(() => {
        let wavesurfer = window.WaveSurfer.create({
          container: '#waveform',
          waveColor: 'violet',
          progressColor: 'purple'
        })

        this.wavesurfer = wavesurfer

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        let context = new AudioContext();

        fetch('/base.mp3')
          // Get response as ArrayBuffer
          .then(response => response.arrayBuffer())
          .then(buffer => {
            // Decode audio into an AudioBuffer
            return new Promise((resolve, reject) => {
              context.decodeAudioData(buffer, resolve, reject);
            });
          })
          // Run detection
          .then(buffer => {
            try {
              const bpm = detect(buffer);
              this.setState({bpm})
            } catch (err) {
              console.error(err);
            }
          }
        );

        wavesurfer.load('/base.mp3')

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
      zoom: this.state.zoom += 10
    })

    this.wavesurfer.zoom(this.state.zoom)
  }

  lessZoom = () => {
    this.setState({
      zoom: this.state.zoom -= 10
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
    if(!this.state.shouldRender) return <div>Loading....</div>
    return (
      <React.Fragment>
        <div id="waveform"></div>
        <div>BPM: {this.state.bpm}</div>
        <div>Zoom
          <button onClick={() => this.moreZoom()}>IN</button>
          <button onClick={() => this.lessZoom()}>OUT</button>
        </div>

        <div>Loop ({this.state.loopActive ? 'Activated' : 'Unabled'})
          <button onClick={() => this.setLoop()}>Loop</button>
        </div>
      </React.Fragment>
    );
  }
}

export default PlayerAudio;
