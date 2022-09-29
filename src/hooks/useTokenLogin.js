import { axiosAPI } from "../api/axiosAPI"
import { getError, valToken } from "../utils/apiUtil"
import { useLogin } from "./useLogin"

export const useTokenLogin = () => {
    const { setLogin } = useLogin()

    const refresh = async (app, current) => {
        let err = null
        let token = current || null
        if (token && !valToken(token, app))
            token = null
        if (!token) {
            const endpoint = 'renew'
            const url = `/${endpoint}`
            try {
                const resp = await axiosAPI.get(url)
                token = resp?.data?.token
            } catch (error) {
                err = getError(error)
                console.log(error)
            }
            setLogin(prev => { return { ...prev, token } })
        }
        return { token, err }
    }

    return refresh
}