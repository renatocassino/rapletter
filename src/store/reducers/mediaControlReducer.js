import initialState from '../state'

import {
  SET_MEDIA_CONTROL,
  TOGGLE_ACTIVE_LOOP
} from '../actions'

const mediaControlReducer = (state = initialState.mediaInfo, action) => {
  switch(action.type) {
  case SET_MEDIA_CONTROL: return Object.assign({}, state, action.mediaControl)
  case TOGGLE_ACTIVE_LOOP: return Object.assign({}, state, {
    loopActive: !state.loopActive
  })
  }
  return state
}

export default mediaControlReducer
