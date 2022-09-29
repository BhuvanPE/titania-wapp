import { useEffect } from "react"
import { axiosPrivateAPI } from "../api/axiosAPI";
import { useAuth } from "./useAuth";
import { useTokenAuth } from "./useTokenAuth";

export const useAxiosAuth = () => {
    const { auth } = useAuth()
    const refresh = useTokenAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivateAPI.interceptors.request.use(
            async (config) => {
                const { token } = await refresh(auth.app, auth.token)
                if (token)
                    config.headers['Authorization'] = `Bearer ${token}`
                return config;
            },
            (error) => Promise.reject(error)
        )

        return () => {
            axiosPrivateAPI.interceptors.request.eject(requestIntercept);
        }
    }, [auth, refresh])

    return axiosPrivateAPI
}