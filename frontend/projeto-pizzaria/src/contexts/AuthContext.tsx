// React imports
import { createContext, ReactNode, useState, useEffect } from 'react'


// Nookie
import { destroyCookie, setCookie, parseCookies } from 'nookies'

// Next router
import Router from 'next/router'
import { api } from '../services/apiClient'


// Toastfiy
import { toast } from 'react-toastify'


type AuthContextData = {
    user: UserProps
    isAuthenticated: boolean
    sigIn: (credentials: SigInProps) => Promise<void> // if async function promise
    singOut: () => void
    singUp: (credentials: SingUpProps) => Promise<void>
}


type UserProps = {
    id: string,
    name: string,
    email: string
}

type SigInProps = {
    email: string,
    password: string
}

type AuthProviderProps = {
    children: ReactNode
}

type SingUpProps = {
    name: string,
    email: string,
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function singOut() {
    try {
        destroyCookie(undefined, 'token')

        Router.push('/')

    } catch (e) {
        console.log(e.message)
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user // convert to boolean, if state user set isAuthenticated to true

    useEffect(() => {
        //Get token
        const { 'token': token } = parseCookies()

        // Get details of user
        if (token) {
            api.get('/me')
                .then(res => {
                    const { id, name, email } = res.data

                    setUser({
                        id,
                        name,
                        email
                    })
                })
                .catch((e) => {
                    // Singout user if catch
                    // singOut()
                    
                })
        }
    }, [])


    async function sigIn({ email, password }: SigInProps) {
        try {
            const res = await api.post('/login', {
                email,
                password
            })

            const { id, name, token } = res.data
            setCookie(undefined, 'token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expires in 1 month
                path: '/' // All routes get access to the token

            })

            setUser({
                id,
                name,
                email
            })

            // Next requests recive the token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logando!')

            // Redirect user to dashboard
            Router.push('/dashboard')
        } catch (e) {
            toast.error('Usuário ou senha incorretos!')
            console.log(e.message)
        }

    }

    async function singUp({ name, email, password }: SingUpProps) {

        try {
            const res = await api.post('/register', {
                name,
                email,
                password
            })

            toast.success('Cadastro realizado!')

            Router.push('/')

            return res.data

        } catch (e) {
            toast.error('Ocorreu um erro, tente novamente mais tarde!')
            console.log(e.message)
        }

    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, sigIn, singOut, singUp }}>
            {children}
        </AuthContext.Provider>
    )
}


