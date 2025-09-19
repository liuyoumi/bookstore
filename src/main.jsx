import {createRoot} from 'react-dom/client'

// global style
import "./style/index.css"

// state manage
import {Provider} from 'react-redux'
import store from "./store/index.js"

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App/>
  </Provider>,
)
