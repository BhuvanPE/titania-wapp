import { useCallback, useEffect } from "react"
import { axiosAPI, axiosPrivateAPI } from "../api/axiosAPI";
import { getCredentials, getError, valToken } from "../utils/apiUtil";
import { useAuth } from "./useAuth";

export const useAxiosAuth = () => {
    const { auth, setAuth } = useAuth()

    const getToken = useCallback(async () => {
        const app = auth?.app
        let err = null
        let token = auth?.token || null
        if (token && !valToken(token, app))
            token = null
        if (!token) {
            const { userID, password } = getCredentials().find(p => p.app === app)
            const endpoint = 'token'
            const url = `/${endpoint}?app=${app}&userID=${encodeURIComponent(userID)}&password=${encodeURIComponent(password)}`
            try {
                const resp = await axiosAPI.post(url)
                token = resp?.data?.token
            } catch (error) {
                err = getError(error)
            }
            setAuth(prev => { return { ...prev, token, err } })
        }
        return { token, err }
    }, [auth, setAuth])

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
    }, [auth, getToken])

    return axiosPrivateAPI
}