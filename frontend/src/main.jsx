import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './state/store/index'
import './index.css'
import App from './App.jsx'

// Initialize auth token from localStorage
import authService from './services/authService'
const token = authService.getToken()
if (token) {
  authService.setToken(token)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
