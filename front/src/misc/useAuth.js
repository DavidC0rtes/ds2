// Este archivo debe llamarse por cualquier componente que utiliza auth state.
// https://usehooks.com/useAuth/
// https://reactrouter.com/web/example/auth-workflow

import React, { useState, useEffect, useContext, createContext } from "react"
import loginService from '../services/login'
import userService from '../services/users'

const authContext = createContext()

// Componente proveedor del contexto auth a todos los componentes debajo de él (children)
export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext)
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(window.localStorage.getItem('user'))
    
    /**
     * Métodos para manipular el estado del usuario
     */

    const login = async (credentials) => {
        const result = await loginService.login(credentials)
        window.localStorage.setItem('user', JSON.stringify(result))
        setUser(result)
    }

    const signup = async (obj) => {
        const newUser = await userService.create(obj)
        
        setUser(newUser)
    }

    const logout = () => { 
        window.localStorage.removeItem('user')
        setUser(null)
    }

    return {
        user,
        login,
        logout
    }
}