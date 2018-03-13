import { setIsPlaying } from '../../../store/actions'

export function play() {
  const { store } = this.props
  const { dispatch } = store

  dispatch(setIsPlaying(true))
}
