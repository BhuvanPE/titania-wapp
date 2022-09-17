import jwtDecode from "jwt-decode"
import moment from "moment"
import { configType } from "../types/configType"

const app_P = process.env.REACT_APP_API_App_Titania_P
const userID_P = process.env.REACT_APP_API_UserID_Titania_P
const password_P = process.env.REACT_APP_API_Password_Titania_P

const app_D = process.env.REACT_APP_API_App_Titania_D
const userID_D = process.env.REACT_APP_API_UserID_Titania_D
const password_D = process.env.REACT_APP_API_Password_Titania_D

export const getCredentials = () => {
    return [
        {
            app: app_P,
            userID: userID_P,
            password: password_P,
            isDemo: false
        },
        {
            app: app_D,
            userID: userID_D,
            password: password_D,
            isDemo: true
        }
    ]
}

export const getAuth = (isDemo) => {
    const { app } = getCredentials().find(p => p.isDemo === isDemo)
    return { app, isDemo }
}

export const getLogin = () => {
    return { logged: false }
}

export const getError = (err) => {
    return {
        message: ((err.response?.data?.message || err.response?.data?.Message) || err.message) || null,
        detail: (err.response?.data?.detail || err.response?.data?.MessageDetail) || null,
        status: err.response?.status || 0,
        oops: !(err.response?.data?.detail === null)
    }
}

export const valToken = (token, app) => {
    const metaToken = jwtDecode(token)
    const { exp, app: appToken } = metaToken
    const expDate = moment.unix(exp).add(-configType.expToken, 'seconds').toDate()
    return Date.now() < expDate.getTime() && app === appToken
}