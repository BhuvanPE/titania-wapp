import moment from 'moment'
import React, { createContext, useState } from 'react'
import { lstorageType } from '../types/lstorageType'
import { getLogin } from '../utils/apiUtil'

export const LoginContext = createContext({})

export const LoginProvider = ({ children }) => {
    const [login, setLogin] = useState(init())

    return (
        <LoginContext.Provider value={{ login, setLogin }}>
            {children}
        </LoginContext.Provider>
    )
}

const init = () => {
    const loginItem = JSON.parse(localStorage.getItem(lstorageType.hoUseLogin))
    if (loginItem) {
        const { lastAccess, remember, idleTime } = loginItem
        if (lastAccess && idleTime) {
            const lastDate = moment.unix(lastAccess).add(idleTime, 'minutes').toDate()
            if (Date.now() < lastDate.getTime() || remember)
                return loginItem
        }
    }
    return getLogin()
}