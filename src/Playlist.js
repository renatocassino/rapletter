import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'react-fa'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
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
    <List>
      <Subheader>Playlist</Subheader>
      {playlist.songs.map((song, idx) => {
        return (
          <ListItem key={idx}
            disabled={idx === playlist.currentSong}
            onClick={() => {
              wavesurfer.load(song.mediaInfo.url)
              dispatch(setCurrentSong(idx))
            }}
            style={{ backgroundColor: idx !== playlist.currentSong ? '#FAFAFA' : '#DCEDC8' }}
            primaryText={song.mediaInfo.title}
            rightIcon={<a onClick={(ev) => { ev.stopPropagation(); deleteSong(idx) }}><Icon name="times" /></a>}
          />
        )
      })}
    </List>
  )
}

Playlist.contextTypes = {
  store: PropTypes.object
}

export default Playlist
