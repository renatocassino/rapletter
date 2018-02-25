import React from 'react'
import PropType from 'prop-types'
import { setMediaInfo } from './store/actions'
import detect from 'bpm-detective'

class LoaderAudio extends React.Component {
  loadAudioBuffer = (arrayBuffer) => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    let context = new AudioContext()

    const { dispatch } = this.context.store

    new Promise((resolve, reject) => {
      context.decodeAudioData(arrayBuffer, resolve, reject)
    }).then(buffer => {
      try {
        const size = (arrayBuffer.byteLength / 1024 / 1024).toFixed(2).toString().replace('.', ',') + 'MB'
        const bpm = detect(buffer)
        const loopTime = 60*8/bpm
        dispatch(setMediaInfo({ bpm, loopTime, size }))
      } catch (err) {
        console.error(err)
      }
    })
  }

  setNewSong = (ev) => {
    /** Getting BPM */
    var fileReader  = new FileReader()
    const dispatch = this.context.store.dispatch
    const self = this

    fileReader.onload = function() {
      var arrayBuffer = this.result
      self.loadAudioBuffer(arrayBuffer)
    }

    this.context.store.dispatch(setMediaInfo({ title: ev.target.value.split(/(\\|\/)/g).pop() }))

    fileReader.readAsArrayBuffer(ev.target.files[0])
    var url = URL.createObjectURL(ev.target.files[0])
    this.props.wavesurfer.load(url)
  }

  setNewSongUsingUrl = (ev) => {
    const url = ev.target.value
    const { dispatch } = this.context.store

    fetch(url)
      // Get response as ArrayBuffer
      .then(response => response.arrayBuffer())
      .then(this.loadAudioBuffer)

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