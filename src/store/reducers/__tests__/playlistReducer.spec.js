import {
  ADD_SONG_TO_PLAYLIST,
  DELETE_SONG_TO_PLAYLIST,
  SET_CURRENT_SONG_TO_PLAYLIST,
  ADD_CUE_POINT,
  REMOVE_CUE_POINT
} from '../../actions'

import playlistReducer from '../playlistReducer'

describe('playlistReducer', () => {
  let state

  it('set current song index to playlist', () => {
    state = {
      currentSong: 0,
      songs: [{}, {}, {}]
    }

    const newState = playlistReducer(state, { type: SET_CURRENT_SONG_TO_PLAYLIST, currentSong: 2 })
    expect(newState.currentSong).toBe(2)
  })

  it('set current song with index more than songs in the playlist', () => {
    state = {
      currentSong: 0,
      songs: [{}, {}]
    }

    const newState = playlistReducer(state, { type: SET_CURRENT_SONG_TO_PLAYLIST, currentSong: 4 })
    expect(newState.currentSong).toBe(2)
  })

  it('adding song to playlist', () => {
    state = {
      songs: [{}, {}]
    }

    const newState = playlistReducer(state, { type: ADD_SONG_TO_PLAYLIST, song: { title: 123 } })
    expect(newState.songs.length).toBe(3)
    expect(newState.songs[2].title).toBe(123)
  })

  it('delete song to playlist when currentSong is more than or equals the deleted song', () => {
    state = {
      currentSong: 1,
      songs: [{title: 1 }, { title: 2 }]
    }

    const newState = playlistReducer(state, { type: DELETE_SONG_TO_PLAYLIST, songId: 1 })
    expect(newState.songs.length).toBe(1)
    expect(newState.songs).toEqual([{ title: 1 }])
    expect(newState.currentSong).toBe(0)
  })

  it('delete song to playlist when currentSong is less than the deleted song', () => {
    state = {
      currentSong: 1,
      songs: [{ title: 1 }, { title: 2 }, { title: 3 }, { title: 4 }]
    }

    const newState = playlistReducer(state, { type: DELETE_SONG_TO_PLAYLIST, songId: 2 })
    expect(newState.songs.length).toBe(3)
    expect(newState.songs).toEqual([{ title: 1 }, { title: 2 }, { title: 4 }])
    expect(newState.currentSong).toBe(1)
  })

  it('adding cuepoint to song', () => {
    state = {
      currentSong: 1,
      songs: [{
        cuePoints: []
      },
      {
        cuePoints: [{ start:1, end:1, id: 1 }]
      }]
    }

    const newCuePoint = { start: 2, end: 3, id: 2 }
    const newState = playlistReducer(state, { type: ADD_CUE_POINT, cuePoint: newCuePoint })
    expect(newState.songs[1].cuePoints.length).toBe(2)
    expect(newState.songs[1].cuePoints[1]).toEqual(newCuePoint)
  })

  it('remove cuepoint to song', () => {
    state = {
      currentSong: 1,
      songs: [{
        cuePoints: []
      },
      {
        cuePoints: [
          {
            start: 1,
            end: 1,
            id: 0
          },
          {
            start: 1,
            end: 1,
            id: 1
          }
        ]
      }]
    }

    const newState = playlistReducer(state, { type: REMOVE_CUE_POINT, cuePointId: 1 })
    expect(newState.songs[1].cuePoints.length).toBe(1)
    expect(newState.songs[1].cuePoints[0].id).toEqual(0)
  })
})
