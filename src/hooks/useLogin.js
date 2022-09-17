import { useContext, useDebugValue } from "react"
import { LoginContext } from "../contexts/LoginProvider"

export const useLogin = () => {
    const context = useContext(LoginContext)
    const { login } = context
    useDebugValue(login, login => login?.token ? 'Login In' : 'Login Out')
    return context
}