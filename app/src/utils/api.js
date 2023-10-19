import axios from 'axios'

export const BASE_URL = `http://${window.location.hostname}:3000/api`

const CLIENT_TIMEOUT_DEV = 300000

const apiInstance = axios.create({
    baseURL: BASE_URL,
    timeout: CLIENT_TIMEOUT_DEV,
})

export const api = apiInstance