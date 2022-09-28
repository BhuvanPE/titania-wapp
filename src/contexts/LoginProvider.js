import moment from 'moment'
import React, { createContext, useState } from 'react'
import { lstorageType } from '../types/lstorageType'
import { getLogin } from '../utils/apiUtil'
import { getLastAccess } from '../utils/lstorageUtil'

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
        const lastAccess = getLastAccess()
        const { remember, idleTime, ropag } = loginItem
        if (lastAccess && idleTime && ropag) {
            const lastDate = moment(lastAccess).add(idleTime, 'minutes').toDate()
            if (Date.now() < lastDate.getTime() || remember)
                return loginItem
        }
    }
    return getLogin()
}