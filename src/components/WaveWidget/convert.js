import { colorGenerator } from '../../utils/colorGenerator'

export const cuePointToRegion = (cuePoint) => ({
  id: cuePoint.id,
  start: cuePoint.start,
  end: cuePoint.end,
  color: colorGenerator(),
  drag: false
})

export const regionToCuePoint = (region) => ({
  id: region.id,
  start: region.start,
  end: region.end
})
