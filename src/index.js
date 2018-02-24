import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import store from './store/index'

const renderer = () => {
  ReactDOM.render((
    <App store={store} />
  ), document.getElementById('root'))
}

store.subscribe(renderer)
renderer()

if(typeof window !== 'undefined') {
  window.reduxStore = store
}

// ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
