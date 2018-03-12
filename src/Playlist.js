import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-fa'

import { setCurrentSong, deleteSongToPlaylist } from './store/actions'

const Playlist = ({ wavesurfer }, {
  store
}) => {
  const playlist = store.getState().playlist
  const { dispatch } = store

  const deleteSong = (songId) => {
    const url = playlist.songs[playlist.currentSong].mediaInfo.url
    URL.revokeObjectURL(url)
    dispatch(deleteSongToPlaylist(songId))
  }

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
            <a onClick={() => deleteSong(idx)}>
              <Icon name="times" />
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
