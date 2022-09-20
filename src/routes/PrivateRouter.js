import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard, pageName as pnDashboard } from '../pages/private/Dashboard'
import { RegistrarCPE, pageName as pnRegistrarCPE } from '../pages/private/Func/RegistrarCPE'
import { Panel } from '../pages/private/Panel'

export const PrivateRouter = () => {
    return (
        <>
            <Routes>
                <Route path='/fn/registrarcpe' element={<Panel pageName={pnRegistrarCPE}><RegistrarCPE /></Panel>} />
                <Route path='/dashboard' element={<Panel pageName={pnDashboard}><Dashboard /></Panel>} />
                <Route path='/' element={<Panel pageName={pnDashboard}><Dashboard /></Panel>} />
                <Route path='*' element={<Navigate to='/oops' />} />
            </Routes>
        </>
    )
}
