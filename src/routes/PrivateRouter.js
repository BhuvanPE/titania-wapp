import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/private/Dashboard'

export const PrivateRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='*' element={<Navigate to='/oops' />} />
            </Routes>
        </>
    )
}
