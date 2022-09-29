import { CalendarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'
import { Dashboard } from '../pages/private/Dashboard'
import { ConsultarCPE } from '../pages/private/fn/ConsultarCPE'
import { ProgramarCPE } from '../pages/private/fn/ProgramarCPE'
import { RegistrarCPE } from '../pages/private/fn/RegistrarCPE'
import { ValidarCPE } from '../pages/private/fn/ValidarCPE'
import { Panel } from '../pages/private/Panel'

export const PrivateRouter = () => {
    const { login } = useLogin()

    return (
        <>
            <Routes>
                {
                    privatePages.filter(page => !page.code || (login.ropag && login.ropag.some(rp => rp === page.code))).map((page, index) => (
                        < Route key={index} path={page.path} element={<Panel pageName={page.pageName}><page.component /></Panel>} />
                    ))
                }
                <Route path='*' element={<Navigate to='/oops' />} />
            </Routes>
        </>
    )
}

export const privatePages = [
    { path: '/fn/programarcpe', component: ProgramarCPE, code: 'fnprgcpe', pageName: 'Programar CPE', icon: InboxIcon, order: 5 },
    { path: '/fn/validarcpe', component: ValidarCPE, code: 'fnvalcpe', pageName: 'Validar CPE', icon: CalendarIcon, order: 4 },
    { path: '/fn/consultarcpe', component: ConsultarCPE, code: 'fnconcpe', pageName: 'Consultar CPE', icon: FolderIcon, order: 3 },
    { path: '/fn/registrarcpe', component: RegistrarCPE, code: 'fnregcpe', pageName: 'Registrar CPE', icon: UsersIcon, order: 2 },
    { path: '/dashboard', component: Dashboard, code: null, pageName: 'Dashboard', icon: HomeIcon, order: 1 },
    { path: '/', component: Dashboard, code: null, pageName: 'Dashboard', icon: null, order: null },
]

