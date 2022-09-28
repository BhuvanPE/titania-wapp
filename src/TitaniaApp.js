import React from 'react'
import { AuthProvider } from './contexts/AuthProvider'
import { LoginProvider } from './contexts/LoginProvider'
import { AppRouter } from './routes/AppRouter'

export const TitaniaApp = () => {
    return (
        <AuthProvider>
            <LoginProvider>
                <AppRouter />
            </LoginProvider>
        </AuthProvider>
    )
}
