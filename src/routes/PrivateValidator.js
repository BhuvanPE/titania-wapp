import React from 'react'
import { Navigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export const PrivateValidator = ({ children }) => {
    const { login } = useLogin()

    return login.logged ? children : <Navigate to='/login' />
}
