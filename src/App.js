import React, { Component } from 'react'
import PlayerAudio from './PlayerAudio'
import { Provider } from 'react-redux'

import './App.css'

class App extends Component {
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
