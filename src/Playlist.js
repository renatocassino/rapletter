import React from 'react'
import PropTypes from 'prop-types'

import { setCurrentSong } from './store/actions'

const Playlist = ({ wavesurfer }, {
  store
}) => {
  const playlist = store.getState().playlist
  const { dispatch } = store

  return (
    <div>
      SONGS:
      {playlist.songs.map((song, idx) => {
        return (
          <div
            key={idx}
            style={{background: idx === playlist.currentSong ? '#0F0' : 'none' }}
          >
            <a onClick={() => {
              wavesurfer.load(song.mediaInfo.url)
              dispatch(setCurrentSong(idx))
            }}>
              {song.mediaInfo.title}
            </a>
          </div>
        )
      })}
    </div>
  )
}

Playlist.contextTypes = {
  store: PropTypes.object
}

export default Playlist
