import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/create'
import App from './pages/App'
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

OfflinePluginRuntime.install({
  // 监听sw事件，当更新ready的时候，调用applyUpdate以跳过等待，新的sw立即接替老的sw
  onUpdateReady: () => {
    console.log('SW Event:', 'onUpdateReady')
    OfflinePluginRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.log('SW Event:', 'onUpdated')
    window.swUpdate = true
  }
});