import mediaInfoReducer from '../mediaInfoReducer'
import {
  SET_MEDIA_INFO
} from '../../actions'

describe('mediaInfoReducer', () => {
  it('overwrite params in mediaInfo', () => {
    const mediaInfo = {
      bpm: 90
    }

    const state = mediaInfoReducer({ bpm: 129 }, { type: SET_MEDIA_INFO, mediaInfo })
    expect(state.bpm).toEqual(90)
  })

  it('keep params without overwrite', () => {
    const mediaInfo = {
      loopTime: 1200
    }

    const state = mediaInfoReducer({ bpm: 129 }, { type: SET_MEDIA_INFO, mediaInfo })
    expect(state.bpm).toEqual(129)
    expect(state.loopTime).toEqual(1200)
  })
})
