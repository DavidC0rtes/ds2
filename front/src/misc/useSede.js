/**
 * Este archivo implementa el manejo de la sede seleccionada.
 * Todos los componentes que necesiten acceder esto deben
 * importar este documento.
 */
// https://usehooks.com/useAuth/
// https://reactrouter.com/web/example/auth-workflow

import React, { useState, useContext, createContext } from "react"

const sedeContext = createContext()

// Componente proveedor del contexto sede a todos los componentes debajo de él (children)
export function ProvideSede({ children }) {
    const location = useProvideSede()
    return <sedeContext.Provider value={location}>{children}</sedeContext.Provider>
}

// Hook for child components to get the sede object ...
// ... and re-render when it changes.
export const useSede = () => {
    return useContext(sedeContext)
}

// Provider hook that creates sede object and handles state
function useProvideSede() {
    const [sede, setSede] = useState(JSON.parse(window.localStorage.getItem('sede')))
    const [all, setAll] = useState(JSON.parse(window.localStorage.getItem('all-sedes')) || [])
    /**
     * Métodos para manipular el estado de la variable
     * sede en localStorage.
     */

    const set = async (obj) => {
        setSede(obj)
        window.localStorage.setItem('sede', JSON.stringify(obj))
    }

    const saveAll = async (foo) => {
        setAll(foo)
        window.localStorage.setItem('all-sedes', JSON.stringify(foo))
    }

    const getInitialState = () => {
        if(window.localStorage.getItem('all-sedes') === null) {
            return []
        }
        return JSON.parse(window.localStorage.getItem('all-sedes'))
    }

    return {
        sede, set, all, saveAll
    }
}