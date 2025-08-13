import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './state/store/index'
import './index.css'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals'

// Initialize auth token from localStorage
import authService from './services/authService'
const { token } = authService.initializeAuth()
if (token) {
  authService.setAuthToken(token)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
