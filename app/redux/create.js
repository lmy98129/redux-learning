import { createStore, applyMiddleware } from 'redux'
import reducer from './modules'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

const loggerMiddleware = createLogger({collapsed: true});

const enhancer = composeWithDevTools(
  applyMiddleware(loggerMiddleware),
)

export default createStore(
  reducer,
  enhancer
);