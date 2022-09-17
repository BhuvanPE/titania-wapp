import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFound } from '../pages/NotFound'
import { Home } from '../pages/public/Home'

export const PublicRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='oops' element={<NotFound />} />
                <Route path='*' element={<Navigate to='/oops' />} />
            </Routes>
        </>
    )
}
