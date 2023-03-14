import React from 'react'
import ReactDOM from 'react-dom/client'
// https://www.geeksforgeeks.org/what-is-react-router-dom/ 
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Wrapping everything in BrowserRouser, for react-router-dom*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
