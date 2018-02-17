import React, { Component } from 'react'
import PlayerAudio from './PlayerAudio'
import logo from './logo.png'

import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Rap Letter Player</h1>
        </header>
        <br />
        <PlayerAudio />
      </div>
    )
  }
}

export default App
