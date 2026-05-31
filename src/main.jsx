import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { AuthProvider } from './app/AuthContext.jsx'
import { AppThemeProvider } from './app/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <AppThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
)
