import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import store from './utils/store'
import './index.css'

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
