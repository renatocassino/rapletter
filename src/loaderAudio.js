import React from 'react'
import PropType from 'prop-types'
import { addSongToPlaylist } from './store/actions'
import detect from 'bpm-detective'

const AudioContext = window.AudioContext || window.webkitAudioContext

class LoaderAudio extends React.Component {
  loadAudioBuffer = (arrayBuffer) => {
    let context = new AudioContext()

    return new Promise((resolve, reject) => {
      context.decodeAudioData(arrayBuffer, resolve, reject)
    }).then(buffer => {
      try {
        const size = (arrayBuffer.byteLength / 1024 / 1024).toFixed(2).toString().replace('.', ',') + 'MB'
        const bpm = detect(buffer)
        const loopTime = 60*8/bpm

        return { bpm, loopTime, size }

      } catch (err) {
        console.error(err)
      }
    })
  }

  setNewSong = (ev) => {
    const target = ev.target
    const self = this

    var fileReader  = new FileReader()
    const blob = ev.target.files[0]

    fileReader.readAsArrayBuffer(blob)
    fileReader.onload = function() {
      const title = target.value.split(/(\\|\/)/g).pop()
      var arrayBuffer = this.result

      self.loaderSong({ blob, arrayBuffer, state: { title } })
    }
  }

  setNewSongUsingUrl = async (urlToFetch, title) => {
    let response = await fetch(urlToFetch)
    const blob = await response.blob()

    response = await fetch(urlToFetch)
    const arrayBuffer = await response.arrayBuffer()

    this.loaderSong({ arrayBuffer, blob, state: { title } })
  }

  loaderSong = async ({ arrayBuffer, blob, state={} }) => {
    const { dispatch } = this.context.store

    const url = await URL.createObjectURL(blob)
    const songState = await this.loadAudioBuffer(arrayBuffer)
    const newState = Object.assign({}, songState, state, { url })
    dispatch(addSongToPlaylist({ mediaInfo: newState }))
    this.props.wavesurfer.load(url)
  }

  componentDidMount() {
    if(typeof window === 'undefined') return
    const location = window.location
    const baseUrl = `${location.protocol}//${location.host}`
    this.setNewSongUsingUrl(`${baseUrl}/audios/royce-boom.mp3`, 'Royce Da 5\'9 - Boom.mp3')
    this.setNewSongUsingUrl(`${baseUrl}/audios/Ante-Up-Instrumental.mp3`, 'Ante Up Instrumental.mp3')
    this.setNewSongUsingUrl(`${baseUrl}/audios/DJ-Mitsu-The-Beats-Yeah-Yall.mp3`, 'DJ-Mitsu-The-Beats-Yeah-Yall.mp3')
  }

  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <div>
          <h3>Load your files here</h3>
        </div>
        <div><input type="file" id="mediaFile" onChange={this.setNewSong} /></div>
      </div>
    )
  }
}

LoaderAudio.contextTypes = {
  store: PropType.object
}

export default LoaderAudio
