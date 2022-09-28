import moment from "moment"
import { lstorageType } from "../types/lstorageType"

export const setLastAccess = () => {
    const lastAccess = moment(new Date(Date.now())).unix()
    localStorage.setItem(lstorageType.daLastAccess, lastAccess)
}

export const getLastAccess = () => {
    const lastAccess = localStorage.getItem(lstorageType.daLastAccess) || null
    if (lastAccess)
        return moment.unix(lastAccess).toDate()
    return lastAccess
}