/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";


export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state

    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        //setting the initial auth
        user: JSON.parse(localStorage.getItem("user"))
    })

    console.log("auth context state", state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}