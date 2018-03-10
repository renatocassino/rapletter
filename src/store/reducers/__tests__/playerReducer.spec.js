import {
  TOGGLE_IS_PLAYING,
  SET_IS_PLAYING,
  TOGGLE_ACTIVE_LOOP
} from '../../actions'

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

  it('toggle loopActive change true to false', () => {
    const playerState = {
      loopActive: true
    }

    const state = playerReducer(playerState, { type: TOGGLE_ACTIVE_LOOP })
    expect(state.loopActive).toBe(false)
  })

  it('toggle loopActive change false to true', () => {
    const playerState = {
      loopActive: false
    }

    const state = playerReducer(playerState, { type: TOGGLE_ACTIVE_LOOP })
    expect(state.loopActive).toBe(true)
  })
})
