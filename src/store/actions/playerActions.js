export const TOGGLE_IS_PLAYING = 'TOGGLE_IS_PLAYING'
export const SET_IS_PLAYING = 'SET_IS_PLAYING'
export const TOGGLE_ACTIVE_LOOP = 'TOGGLE_ACTIVE_LOOP'

export const toggleIsPlaying = () => ({
  type: TOGGLE_IS_PLAYING
})

export const setIsPlaying = (isPlaying) => ({
  type: SET_IS_PLAYING,
  isPlaying
})

export const toggleActiveLoop = () => ({
  type: TOGGLE_ACTIVE_LOOP
})
