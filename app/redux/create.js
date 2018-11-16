import { createStore, applyMiddleware } from 'redux'
import reducer from './modules'
import promise from 'redux-promise'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

const loggerMiddleware = createLogger({collapsed: true});

const enhancer = composeWithDevTools(
  applyMiddleware(promise, loggerMiddleware),
)

export default createStore(
  reducer,
  enhancer
);