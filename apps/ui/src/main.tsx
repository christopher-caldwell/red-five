import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import './styles/main.sass'
import './styles/theme.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
)
