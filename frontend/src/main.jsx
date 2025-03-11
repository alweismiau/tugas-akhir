import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {  RouterProvider } from 'react-router-dom'
import { Router } from './routes/Router'
import Logo from './components/logo/Logo';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <img src={Logo} alt="Logo" className="logo" /> */}
    <Logo />
    <RouterProvider router={Router}/>
  </StrictMode>,
)
