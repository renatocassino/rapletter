import initialState from '../state'

import {
  TOGGLE_IS_PLAYING,
  SET_IS_PLAYING,
  TOGGLE_ACTIVE_LOOP
} from '../actions'

const playerReducer = (state = initialState.player, action) => {
  switch(action.type) {
  case TOGGLE_IS_PLAYING: return Object.assign({}, state, {
    isPlaying: !state.isPlaying
  })
  case SET_IS_PLAYING: return Object.assign({}, state, {
    isPlaying: action.isPlaying
  })
  case TOGGLE_ACTIVE_LOOP: return Object.assign({}, state, {
    loopActive: !state.loopActive
  })
  default: return state
  }
}

export default playerReducer
