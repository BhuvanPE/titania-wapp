import { ConfigProvider } from 'antd'
import moment from 'moment'
import React from 'react'
import { AuthProvider } from './contexts/AuthProvider'
import { LoginProvider } from './contexts/LoginProvider'
import { AppRouter } from './routes/AppRouter'

import locale from 'antd/es/locale/es_ES'
import 'moment/locale/es'

moment.locale('es')

export const TitaniaApp = () => {
    return (
        <ConfigProvider locale={locale}>
            <AuthProvider>
                <LoginProvider>
                    <AppRouter />
                </LoginProvider>
            </AuthProvider>
        </ConfigProvider>
    )
}
