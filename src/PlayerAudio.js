import React, { Component } from 'react';
import detect from 'bpm-detective';

const urlAudio = (typeof window !== 'undefined') ? window.location.hash.replace('#', '') : ''

class PlayerAudio extends Component {
  state = {
    shouldRender: false,
    bpm: null,
    zoom: 1,
    loopActive: false,
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
    if(typeof window.WaveSurfer !== 'undefined' || true) {
      setTimeout(() => {
        this.setState({shouldRender: true})
        let wavesurfer = window.WaveSurfer.create({
          container: '#waveform',
          waveColor: 'violet',
          progressColor: 'purple'
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

        <div>Actions:
          <button onClick={() => this.wavesurfer.play()}>Play</button>
          <button onClick={() => this.wavesurfer.pause()}>Stop</button>
        </div>

        <input type="file" id="mediaFile" onChange={this.setNewSong} />
      </React.Fragment>
    );
  }
}

export default PlayerAudio;