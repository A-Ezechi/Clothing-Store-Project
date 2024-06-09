import React, { createContext } from 'react'

const Context = createContext<[Dispatch<SetStateAction<>>]>
const Provider = ({ children }) => {
    const value = {}

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}
export {Context, Provider};