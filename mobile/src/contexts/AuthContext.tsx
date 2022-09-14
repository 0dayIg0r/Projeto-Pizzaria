import React, { useState, createContext, ReactNode, useEffect } from 'react'
import { api } from '../services/api'

//  Automatic login
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UseProps } from 'react-native-svg'


type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean
    signIn: (credentials: SignInProps) => Promise<void>,
    loadingAuth: boolean,
    loading: boolean,
    signOut: () => Promise<void>
}

type UserProps = { 
    id: string,
    name: string,
    email: string,
    token: string,
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
    const[loading, setloading] = useState(true)

    const isAuthenticated = !!user.name

    useEffect(() => {
        async function getUser() {
            // pick data of user
            const userInfo = await AsyncStorage.getItem('token')
            let hasUser: UserProps = JSON.parse(userInfo || '{}')

            // verify userinfo
            if (Object.keys(hasUser).length > 0) {
                api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`

                setUser({
                    id: hasUser.id,
                    name: hasUser.name,
                    email: hasUser.email,
                    token: hasUser.token

                })
            }

            setloading(false)
        }
        getUser()
    }, [])

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

    async function signOut(){
        await AsyncStorage.clear()
        .then(()=>{
            setUser({
                id: '',
                name: '',
                email: '',
                token: ''
            })
        })
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, loading, loadingAuth, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}