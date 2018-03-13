import { setIsPlaying } from '../../../store/actions'

export function pause() {
  const { store } = this.props
  const { dispatch } = store

  dispatch(setIsPlaying(false))
}
