import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/create'
import Table from './components/Table'

ReactDOM.render(
  <Provider store={store}>
    <Table />
  </Provider>,
  document.getElementById('root')
)