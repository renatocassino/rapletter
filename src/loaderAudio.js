import React from 'react'
import PropType from 'prop-types'
import { addSongToPlaylist } from './store/actions'
import detect from 'bpm-detective'
import RaisedButton from 'material-ui/RaisedButton'

const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

class LoaderAudio extends React.Component {
  loadAudioBuffer = (arrayBuffer) => {
    return new Promise((resolve, reject) => {
      context.decodeAudioData(arrayBuffer, resolve, reject)
    }).then(buffer => {
      try {
        const bpm = detect(buffer)
        const loopTime = 60*8/bpm

        return { bpm, loopTime }

      } catch (err) {
        console.error(err)
      }
    })
  }

  setNewSong = (ev) => {
    const target = ev.target
    const self = this
    if(ev.target.files.length === 0) return

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
    window.wavesurfer.load(url)
  }

  componentDidMount() {
    if(typeof window === 'undefined') return
    const location = window.location
    let baseUrl = `${location.protocol}//${location.host}`
    if(location.host.match(/github/i)) {
      baseUrl = 'https://raw.githubusercontent.com/tacnoman/rapletter/master/public'
    }
    // this.setNewSongUsingUrl(`${baseUrl}/audios/royce-boom.mp3`, 'Royce Da 5\'9 - Boom.mp3')
    // this.setNewSongUsingUrl(`${baseUrl}/audios/Ante-Up-Instrumental.mp3`, 'Ante Up Instrumental.mp3')
    this.setNewSongUsingUrl(`${baseUrl}/audios/DJ-Mitsu-The-Beats-Yeah-Yall.mp3`, 'DJ-Mitsu-The-Beats-Yeah-Yall.mp3')
    this.setNewSongUsingUrl(`${baseUrl}/audios/Pela-manha-Beat-Molla-Dj-Instrumental.mp3`, 'Pela manhã Beat - Molla DJ')
  }

  render() {
    const { playlist } = this.context.store.getState()
    return (
      <div style={{ flexGrow: 1 }}>
        <div>
          <h3>Load your files here</h3>
        </div>
        <RaisedButton
          label="Choose a song"
          labelPosition="before"
          style={{ margin: 12 }}
          containerElement="label"
        >
          <input type="file" id="mediaFile" style={{
            cursor: 'pointer',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            width: '100%',
            opacity: 0,
          }} onChange={this.setNewSong}
          accept="audio/*" />
        </RaisedButton>
      </div>
    )
  }
}

LoaderAudio.contextTypes = {
  store: PropType.object
}

export default LoaderAudio
