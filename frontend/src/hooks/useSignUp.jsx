import { useState } from "react"
import api from "../api/axios.js"
import { useAuthContext } from "./useAuthContext.jsx"

export const useSignUp = () => {
    const [error, setError] = useState()
    const [loading, setLoading] = useState()
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setLoading(true)
        setError(null)

        try {
            const response = await api.post("/auth/signup",
                { email, password }
            )
            const json = await response.data
            //save user to local storage
            localStorage.setItem("user", JSON.stringify(json))
            //update auth context
            dispatch({ type: "LOGIN", payload: json })

        } catch (err) {
            setError(err.response?.data?.error || "Signup failed")
        } finally {
            setLoading(false)
        }
    }

    return { signup, error, loading }
}