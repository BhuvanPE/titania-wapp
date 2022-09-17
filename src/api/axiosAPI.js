import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_Titania

export const axiosAPI = axios.create({
    baseURL: API_URL
})

export const axiosCookieAPI = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const axiosPrivateAPI = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})