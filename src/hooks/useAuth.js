import { useContext, useDebugValue } from "react"
import { AuthContext } from "../contexts/AuthProvider"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { auth } = context
    useDebugValue(auth, auth => auth?.token ? 'Auth In' : 'Auth Out')
    return context
}