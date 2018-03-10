import initialState, {
  song
} from '../state'

import {
  ADD_SONG
} from '../actions/songsActions'

const songsReducer = (state = initialState.songs, action) => {
  switch(action.type) {
  case ADD_SONG: return [...state, song]
  default: return state
  }
}

export default songsReducer
