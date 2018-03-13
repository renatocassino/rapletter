import {
  addCuePoint
} from '../../../store/actions'
import { regionToCuePoint } from '../convert'

export function regionCreated(region) {
  const { store } = this.props
  const { dispatch } = store

  if(region.attributes.ignoreEvents) return
  dispatch(addCuePoint(regionToCuePoint(region)))
}
