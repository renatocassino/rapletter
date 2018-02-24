import initialState from '../state'

import {
  SET_MEDIA_INFO,
  TOGGLE_ACTIVE_LOOP
} from '../actions'

const mediaInfoReducer = (state = initialState.mediaInfo, action) => {
  switch(action.type) {
  case SET_MEDIA_INFO: return Object.assign({}, state, action.mediaInfo)
  case TOGGLE_ACTIVE_LOOP: return Object.assign({}, state, {
    loopActive: !state.loopActive
  })
  }
  return state
}

export default mediaInfoReducer
