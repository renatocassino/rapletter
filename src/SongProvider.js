import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { song as songInitialState } from './store/state'

class SongProvider extends React.Component {
  static childContextTypes = {
    currentSong: PropTypes.object
  }

  // Adding currentSong to context
  getChildContext() {
    const state = this.context.store.getState()
    const currentSong = state.playlist.songs.length === 0
      ? songInitialState
      : state.playlist.songs[state.playlist.currentSong]

    return { currentSong: currentSong }
  }

  render() {
    return Children.only(this.props.children)
  }
}

SongProvider.propTypes = {
  children: PropTypes.any
}

SongProvider.contextTypes = {
  store: PropTypes.object
}

export default SongProvider