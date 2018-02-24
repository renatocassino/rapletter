export const ADD_CUE_POINT = 'ADD_CUE_POINT'
export const REMOVE_CUE_POINT = 'REMOVE_CUE_POINT'

export const addCuePoint = (cuePoint) => ({
  type: ADD_CUE_POINT,
  cuePoint
})

export const removeCuePoint = (cuePointId) => ({
  type: REMOVE_CUE_POINT,
  cuePointId
})
