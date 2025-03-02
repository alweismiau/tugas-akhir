import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { Router } from './routes/Router'
// import { AuthContextProvider } from './context/auth/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AuthContextProvider> */}
    <RouterProvider router={Router}/>
    {/* </AuthContextProvider> */}
  </StrictMode>,
)
