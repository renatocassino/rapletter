import React, { Component } from 'react'
import PropType from 'prop-types'
import PlayerAudio from './PlayerAudio'
import { Provider } from 'react-redux'

import './App.css'

class App extends Component {
  static defaultProps = {
    store: PropType.object
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <PlayerAudio />
        </div>
      </Provider>
    )
  }
}

export default App
