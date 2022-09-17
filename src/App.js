import React from 'react'
import { AuthProvider } from './contexts/AuthProvider'
import { LoginProvider } from './contexts/LoginProvider'
import { AppRouter } from './routes/AppRouter'

const App = () => {
  return (
    <AuthProvider>
      <LoginProvider>
        <AppRouter />
      </LoginProvider>
    </AuthProvider>
  )
}

export default App;
