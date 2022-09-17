import moment from 'moment/moment'
import React, { createContext, useState } from 'react'
import { configType } from '../types/configType'
import { lstorageType } from '../types/lstorageType'
import { getAuth } from '../utils/apiUtil'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(init())

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

const init = () => {
  const authItem = JSON.parse(localStorage.getItem(lstorageType.hoUseAuth))
  if (authItem) {
    const { lastAccess } = authItem
    if (lastAccess) {
      const lastDate = moment.unix(lastAccess).add(configType.idleTime, 'minutes').toDate()
      if (Date.now() < lastDate.getTime())
        return authItem
    }
  }
  return getAuth(false)
}