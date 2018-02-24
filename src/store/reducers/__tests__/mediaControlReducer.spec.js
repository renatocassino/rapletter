import mediaInfoReducer from '../mediaControlReducer'
import {
  SET_MEDIA_CONTROL,
  TOGGLE_ACTIVE_LOOP
} from '../../actions'

describe('mediaControlReducer', () => {
  // it('overwrite params in mediaInfo', () => {
  //   const mediaInfo = {
  //     bpm: 90
  //   }

  //   const state = mediaInfoReducer({ bpm: 129 }, { type: SET_MEDIA_CONTROL, mediaInfo })
  //   expect(state.bpm).toEqual(90)
  // })

  // it('keep params without overwrite', () => {
  //   const mediaInfo = {
  //     loopTime: 1200
  //   }

  //   const state = mediaInfoReducer({ bpm: 129 }, { type: SET_MEDIA_CONTROL, mediaInfo })
  //   expect(state.bpm).toEqual(129)
  //   expect(state.loopTime).toEqual(1200)
  // })

  it('toggle loopActive change true to false', () => {
    const mediaControlInitialState = {
      loopActive: true
    }

    const state = mediaInfoReducer(mediaControlInitialState, { type: TOGGLE_ACTIVE_LOOP })
    expect(state.loopActive).toBe(false)
  })

  it('toggle loopActive change false to true', () => {
    const mediaControlInitialState = {
      loopActive: false
    }

    const state = mediaInfoReducer(mediaControlInitialState, { type: TOGGLE_ACTIVE_LOOP })
    expect(state.loopActive).toBe(true)
  })
})
