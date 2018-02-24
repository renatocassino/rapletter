import cuePointsReducer, {
  ADD_CUE_POINT,
  REMOVE_CUE_POINT
} from '../cuePointsReducer'

describe('cuePointsReducer', () => {
  it('add new cuepoint when state is initial', () => {
    const cuePoint = {
      start: 123, end: 256, id: 1
    }

    const state = cuePointsReducer(undefined, { type: ADD_CUE_POINT, cuePoint })
    expect(state).toEqual([cuePoint])
  })

  it('add new cuepoint when exist come cuepoint', () => {
    const cuePoint = {
      start: 123, end: 256, id: 2
    }

    const initialState = { start: 111, end: 122, id: 1 }

    const state = cuePointsReducer([initialState], { type: ADD_CUE_POINT, cuePoint })
    expect(state).toEqual([initialState, cuePoint])
  })
  
  it('remove cuepoint passing id', () => {
    const initialState = [
      { start: 111, end: 122, id: 1 },
      { start: 222, end: 233, id: 2 }
    ]

    const state = cuePointsReducer(initialState, { type: REMOVE_CUE_POINT, cuePointId: 2 })
    expect(state).toEqual([{ start: 111, end: 122, id: 1 }])
  })
})
