import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { appStore } from './app/store.js'
import { Toaster } from "./components/ui/sonner.jsx";
import { useLoadUserQuery } from './api/authApi.js'

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  return <>
    {
      isLoading ? <h1>Loading...</h1> : <>{children}</>
    }
  </>
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <App />
      </Custom>
      <Toaster />
    </Provider>
  </StrictMode>,
)
