import { setIsPlaying } from '../../../store/actions'

export function stop() {
  const { store } = this.props
  const { dispatch } = store

  dispatch(setIsPlaying(false))
}
