import React from 'react'
import PropType from 'prop-types'
import { Icon } from 'react-fa'

const PlayPause = ({
  isPlaying,
  onClick = () => {}
}) => {
  const iconName = isPlaying ? 'pause' : 'play'

  return(
    <button onClick={onClick}>
      <Icon name={iconName} />
    </button>
  )
}

PlayPause.propTypes = {
  isPlaying: PropType.bool,
  onClick: PropType.func
}

export default PlayPause
