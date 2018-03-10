export const TOGGLE_IS_PLAYING = 'TOGGLE_IS_PLAYING'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'

export const toggleIsPlaying = () => ({
  type: TOGGLE_IS_PLAYING
})

export const setIsPlaying = (isPlaying) => ({
  type: SET_IS_PLAYING,
  isPlaying
})
