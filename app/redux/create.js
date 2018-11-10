import { createStore, applyMiddleware } from 'redux'
import reducer from './modules'
import promise from 'redux-promise'

export default createStore(
  reducer,
  applyMiddleware(promise)
);