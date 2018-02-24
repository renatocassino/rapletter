import initialState from '../state'

export const ADD_CUE_POINT = 'ADD_CUE_POINT'
export const REMOVE_CUE_POINT = 'REMOVE_CUE_POINT'

export const cuePointsReducer = (state = initialState.cuePoints, action) => {
  switch(action.type) {
  case ADD_CUE_POINT: return [...state, action.cuePoint]
  case REMOVE_CUE_POINT: return state.filter((cuePoint) => cuePoint.id !== action.cuePointId)
  }
  return state
}

export default cuePointsReducer
