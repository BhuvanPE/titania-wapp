import { useEffect } from "react"
import { axiosPrivateAPI } from "../api/axiosAPI"
import { useLogin } from "./useLogin"
import { useTokenLogin } from "./useTokenLogin"

export const useAxiosLogin = () => {
    const { login } = useLogin()
    const refresh = useTokenLogin()

    useEffect(() => {
        const requestIntercept = axiosPrivateAPI.interceptors.request.use(
            async (config) => {
                const { token } = await refresh(login.app, login.token)
                if (token)
                    config.headers['Authorization'] = `Bearer ${token}`
                return config;
            },
            (error) => Promise.reject(error)
        )

        return () => {
            axiosPrivateAPI.interceptors.request.eject(requestIntercept);
        }
    }, [login, refresh])

    return axiosPrivateAPI
}
