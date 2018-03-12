import {
  song
} from '../state'

export const ADD_SONG_TO_PLAYLIST = 'ADD_SONG_TO_PLAYLIST'
export const DELETE_SONG_TO_PLAYLIST = 'DELETE_SONG_TO_PLAYLIST'
export const SET_CURRENT_SONG_TO_PLAYLIST = 'SET_CURRENT_SONG_TO_PLAYLIST'

export const addSongToPlaylist = (currentSong) => ({
  type: ADD_SONG_TO_PLAYLIST,
  song: Object.assign({}, song, currentSong)
})

export const deleteSongToPlaylist = (songId) => ({
  type: DELETE_SONG_TO_PLAYLIST,
  songId
})

export const setCurrentSong = (currentSong = 0) => ({
  type: SET_CURRENT_SONG_TO_PLAYLIST,
  currentSong
})
