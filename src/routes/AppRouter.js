import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useLogin } from '../hooks/useLogin'
import { lstorageType } from '../types/lstorageType'
import { PrivateRouter } from './PrivateRouter'
import { PrivateValidator } from './PrivateValidator'
import { ProtectedRouter } from './ProtectedRouter'
import { ProtectedValidator } from './ProtectedValidator'
import { PublicRouter } from './PublicRouter'
import { PublicValidator } from './PublicValidator'

export const AppRouter = () => {
    const { auth } = useAuth()
    const { login } = useLogin()

    useEffect(() => {
        if (!auth) return
        const authItem = { ...auth }
        delete authItem.token
        localStorage.setItem(lstorageType.hoUseAuth, JSON.stringify(authItem))
    }, [auth])

    useEffect(() => {
        if (!login) return
        const loginItem = { ...login }
        delete loginItem.token
        localStorage.setItem(lstorageType.hoUseLogin, JSON.stringify(loginItem))
    }, [login])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/panel/*' element={
                    <PrivateValidator>
                        <PrivateRouter />
                    </PrivateValidator>
                } />
                <Route path='/login/*' element={
                    <ProtectedValidator>
                        <ProtectedRouter />
                    </ProtectedValidator>
                } />
                <Route path='/*' element={
                    <PublicValidator>
                        <PublicRouter />
                    </PublicValidator>
                } />
            </Routes>
        </BrowserRouter>
    )
}
