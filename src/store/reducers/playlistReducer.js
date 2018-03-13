import initialState from '../state'
import cuePointsReducer from './cuePointsReducer'
import {
  ADD_SONG_TO_PLAYLIST,
  DELETE_SONG_TO_PLAYLIST,
  SET_CURRENT_SONG_TO_PLAYLIST,
  ADD_CUE_POINT,
  UPDATE_CUE_POINT,
  REMOVE_CUE_POINT
} from '../actions'

const playlistReducer = (state = initialState.playlist, action) => {
  switch(action.type) {
  case ADD_SONG_TO_PLAYLIST: return Object.assign({}, state, {
    currentSong: state.songs.length,
    songs: [...state.songs, action.song]
  })
  case SET_CURRENT_SONG_TO_PLAYLIST: return Object.assign({}, state, {
    currentSong: Math.min(action.currentSong, state.songs.length)
  })
  case DELETE_SONG_TO_PLAYLIST: return Object.assign({}, state, {
    currentSong: action.songId <= state.currentSong ? --state.currentSong : state.currentSong,
    songs: state.songs.filter((_, id) => id !== action.songId)
  })
  case ADD_CUE_POINT:
  case UPDATE_CUE_POINT:
  case REMOVE_CUE_POINT:
    if(state.songs.length === 0) return state
    return Object.assign({}, state, {
      songs: state.songs.map((song, idx) => {
        if(idx === state.currentSong) {
          return Object.assign({}, song, {
            cuePoints: cuePointsReducer(song.cuePoints, action)
          })
        }
        return song
      })
    })
  default: return state
  }
}

export default playlistReducer
