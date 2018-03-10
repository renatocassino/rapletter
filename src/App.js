import React, { Component } from 'react'
import PropType from 'prop-types'
import PlayerAudio from './PlayerAudio'
import { Provider } from 'react-redux'
import SongProvider from './SongProvider'

import './App.css'

class App extends Component {
  static defaultProps = {
    store: PropType.object
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <SongProvider>
          <div className="App">
            <PlayerAudio />
          </div>
        </SongProvider>
      </Provider>
    )
  }
}

export default App
