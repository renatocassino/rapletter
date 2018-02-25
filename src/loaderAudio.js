import React from 'react'
import PropType from 'prop-types'
import { setMediaInfo } from './store/actions'
import detect from 'bpm-detective'

class LoaderAudio extends React.Component {
  setNewSong = (ev) => {
    /** Getting BPM */
    var fileReader  = new FileReader();
    const dispatch = this.context.store.dispatch

    fileReader.onload = function() {
      var arrayBuffer = this.result;
      const size = (arrayBuffer.byteLength / 1024 / 1024).toFixed(2).toString().replace('.', ',') + 'MB'

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      let context = new AudioContext();

      new Promise((resolve, reject) => {
        context.decodeAudioData(arrayBuffer, resolve, reject)
      }).then(buffer => {
        try {
          const bpm = detect(buffer);
          const loopTime = 60*8/bpm
          dispatch(setMediaInfo({ bpm, loopTime, size }))
        } catch (err) {
          console.error(err);
        }
      })
    }

    this.context.store.dispatch(setMediaInfo({ title: ev.target.value.split(/(\\|\/)/g).pop() }))

    fileReader.readAsArrayBuffer(ev.target.files[0]);
    var url = URL.createObjectURL(ev.target.files[0]);
    this.props.wavesurfer.load(url)
  }

  setNewSongUsingUrl = (ev) => {
    const url = ev.target.value
    const { dispatch } = this.context.store

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let context = new AudioContext();

    fetch(url)
      // Get response as ArrayBuffer
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        // Decode audio into an AudioBuffer
        new Promise((resolve, reject) => {
          context.decodeAudioData(arrayBuffer, resolve, reject)
        }).then(buffer => {
        try {
          const size = (arrayBuffer.byteLength / 1024 / 1024).toFixed(2).toString().replace('.', ',') + 'MB'
          const bpm = detect(buffer);
          const loopTime = 60*8/bpm
          dispatch(setMediaInfo({ bpm, loopTime, size }))
        } catch (err) {
          console.error(err);
        }
      })
    })

    this.props.wavesurfer.load(url)
  }

  render() {
    return (
      <div>
        <input type="file" id="mediaFile" onChange={this.setNewSong} />
        <input type="text" id="mediaFileUrl" onBlur={this.setNewSongUsingUrl} />
        <span>https://wavesurfer-js.org/example/media/demo.wav</span>
      </div>
    )
  }
}

LoaderAudio.contextTypes = {
  store: PropType.object
}

export default LoaderAudio