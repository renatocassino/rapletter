import React, { Component } from 'react'
import PropType from 'prop-types'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import PlayerAudio from './PlayerAudio'
import { Provider } from 'react-redux'
import SongProvider from './SongProvider'
import TutorialBar from './TutorialBar'

import logo from './grey-pouplayer-logo.svg'

import './App.css'
import VERSION from './version'

class App extends Component {
  static defaultProps = {
    store: PropType.object
  }

  render() {
    return (
      <MuiThemeProvider>
        <Provider store={this.props.store}>
          <SongProvider>
            <div className="App">
              <div className={'logo'}>
                <img src={logo} style={{height: 70, padding: '1rem'}} />
              </div>
              <PlayerAudio />
              <TutorialBar />
              <span style={{fontSize: 12}}>Version: v{VERSION}</span>
            </div>
          </SongProvider>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
