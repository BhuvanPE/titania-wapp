import { useCallback, useEffect } from "react"
import { axiosCookieAPI, axiosPrivateAPI } from "../api/axiosAPI"
import { getError, valToken } from "../utils/apiUtil"
import { useLogin } from "./useLogin"

export const useAxiosLogin = () => {
    const { login, setLogin } = useLogin()

    const getToken = useCallback(async () => {
        const app = login?.app
        const email = login?.email
        let err = null
        let token = login?.token || null
        if (token && !valToken(token, app))
            token = null
        if (!token) {
            const endpoint = 'renew'
            const url = `/${endpoint}?app=${app}&email=${encodeURIComponent(email)}`
            try {
                const resp = await axiosCookieAPI.get(url)
                token = resp?.data?.token
            } catch (error) {
                err = getError(error)
            }
            setLogin(prev => { return { ...prev, token, err } })
        }
        return { token, err }
    }, [login, setLogin])

    useEffect(() => {
        const requestIntercept = axiosPrivateAPI.interceptors.request.use(
            async (config) => {
                const { token } = await getToken()
                if (token)
                    config.headers['Authorization'] = `Bearer ${token}`
                return config;
            },
            (error) => Promise.reject(error)
        )

        return () => {
            axiosPrivateAPI.interceptors.request.eject(requestIntercept);
        }
    }, [login, getToken])

    return axiosPrivateAPI
}