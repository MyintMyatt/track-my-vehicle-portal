import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'

import { RouterProvider } from 'react-router-dom'
import router from '@/route/router'
import { ModelProvider } from './global/modelContext'
import GlobalModel from './global/component/comp-global-model'
import Providers from './components/core/providers'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Providers>
    <RouterProvider router={router} />
  </Providers>
  </StrictMode>,
)
