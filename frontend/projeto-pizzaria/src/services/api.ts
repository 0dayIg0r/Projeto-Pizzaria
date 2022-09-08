// Axios
import axios, { AxiosError } from 'axios'

// Cookies
import { parseCookies } from 'nookies'

// Class error
import { AuthTokenError } from './errors/AuthTokenError'

// Functions
import { singOut } from '../contexts/AuthContext'

export function setupAPIClient(ctx = undefined) {
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3003',
        headers: {
            Authorization: `Bearer ${cookies['token']}`
        }
    })

    api.interceptors.response.use(res => {
        return res;
    }, (e: AxiosError) => {
        if(e.response.status === 401){
            // If HTTP request 401 logout the user
            if(typeof window !== undefined){
                // Function to logout
                singOut()
            } else{
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(e)
    })

    return api
}