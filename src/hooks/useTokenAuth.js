import { axiosAPI } from "../api/axiosAPI"
import { getCredentials, getError, valToken } from "../utils/apiUtil"
import { useAuth } from "./useAuth"

export const useTokenAuth = () => {
    const { setAuth } = useAuth()

    const refresh = async (app, current) => {
        let err = null
        let token = current || null
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
                console.log(error)
            }
            setAuth(prev => { return { ...prev, token } })
        }
        return { token, err }
    }

    return refresh
}