import allReducers from './reducers'

import thunk from 'redux-thunk' // To async methods
import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

const reducers = combineReducers(allReducers)

const store = createStore(reducers, applyMiddleware(thunk))

export default store
