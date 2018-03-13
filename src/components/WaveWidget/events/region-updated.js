import {
  updateCuePoint
} from '../../../store/actions'
import { regionToCuePoint } from '../convert'

export function regionUpdated(region) {
  const { store } = this.props
  const { dispatch } = store

  const cuePoint = regionToCuePoint(region)
  dispatch(updateCuePoint(cuePoint))
}
