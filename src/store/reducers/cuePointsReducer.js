import initialState from '../state'
import {
  ADD_CUE_POINT,
  REMOVE_CUE_POINT
} from '../actions'

export const cuePointsReducer = (state = initialState.cuePoints, action) => {
  switch(action.type) {
  case ADD_CUE_POINT: return [...state, action.cuePoint]
  case REMOVE_CUE_POINT: return state.filter((cuePoint) => cuePoint.id !== action.cuePointId)
  default: return state
  }
}

export default cuePointsReducer
