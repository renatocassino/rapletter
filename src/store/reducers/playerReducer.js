import initialState from '../state'

import {
  TOGGLE_IS_PLAYING,
  SET_IS_PLAYING
} from '../actions/playerActions'

const playerReducer = (state = initialState.player, action) => {
  switch(action.type) {
  case TOGGLE_IS_PLAYING: return Object.assign({}, state, {
    isPlaying: !state.isPlaying
  })
  case SET_IS_PLAYING: return Object.assign({}, state, {
    isPlaying: action.isPlaying
  }) 
  default: return state
  }
}

export default playerReducer
