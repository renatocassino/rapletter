import {
  TOGGLE_IS_PLAYING,
  SET_IS_PLAYING
} from '../../actions/playerActions'

import playerReducer from '../playerReducer'

describe('playerReducer', () => {
  it('toggle isPlaying if is true', () => {
    const newState = playerReducer({ isPlaying: true }, { type: TOGGLE_IS_PLAYING })
    expect(newState.isPlaying).toBe(false)
  })

  it('toggle isPlaying if is false', () => {
    const newState = playerReducer({ isPlaying: false }, { type: TOGGLE_IS_PLAYING })
    expect(newState.isPlaying).toBe(true)
  })

  it('set is playing to true', () => {
    const newState = playerReducer({ isPlaying: false }, { type: SET_IS_PLAYING, isPlaying: true })
    expect(newState.isPlaying).toBe(true)
  })

  it('set is playing to false', () => {
    const newState = playerReducer({ isPlaying: false }, { type: SET_IS_PLAYING, isPlaying: false })
    expect(newState.isPlaying).toBe(false)
  })
})
