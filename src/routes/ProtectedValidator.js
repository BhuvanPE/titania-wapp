import React from 'react'
import { Navigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export const ProtectedValidator = ({ children }) => {
    const { login } = useLogin()

    return login.logged ? <Navigate to='/panel' /> : children
}
