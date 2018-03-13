import { cuePoints } from '../state'
import {
  ADD_CUE_POINT,
  REMOVE_CUE_POINT,
  UPDATE_CUE_POINT
} from '../actions'

export const cuePointsReducer = (state = cuePoints, action) => {
  switch(action.type) {
  case ADD_CUE_POINT: return [...state, action.cuePoint]
  case UPDATE_CUE_POINT: return state.map((cuePoint) => {
    if(cuePoint.id !== action.cuePoint.id) return cuePoint
    return Object.assign({}, cuePoint, action.cuePoint)
  })
  case REMOVE_CUE_POINT: return state.filter((cuePoint) => cuePoint.id !== action.cuePointId)
  default: return state
  }
}

export default cuePointsReducer
