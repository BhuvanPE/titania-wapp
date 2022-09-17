import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/protected/Login'

export const ProtectedRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='*' element={<Navigate to='/oops' />} />
            </Routes>
        </>
    )
}
