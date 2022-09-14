import React, { useState, createContext, ReactNode } from 'react'
import { api } from '../services/api'

//  Automatic login
import AsyncStorage from '@react-native-async-storage/async-storage'


type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>
}

type UserProps = {
    id: string,
    name: string,
    email: string,
    token: string
}

type AuthProviderProps = {
    children: ReactNode
}
type SignInProps = {
    email: string,
    password: string
}
export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })
    const [loadingAuth, setLoadingAuth] = useState(false)

    const isAuthenticated = !!user.name

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true)

        try {
            const res = await api.post('/login', {
                email,
                password
            })

            const { id, name, token } = res.data

            const data = {
                ...res.data
            }

            //  Automatic login
            await AsyncStorage.setItem('token', JSON.stringify(data))
            //  Automatic login
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({
                id,
                name,
                email,
                token
            })

            setLoadingAuth(false)
        } catch (e: any) {
            alert(e.message)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}