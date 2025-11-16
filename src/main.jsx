import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' 
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import Store from './store/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <StrictMode>
      <BrowserRouter>
        <GoogleOAuthProvider clientId="859836237153-i714ihkq8dp3eoha16evantn0naki74u.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
