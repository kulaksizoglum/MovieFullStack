import { useSignUp } from "../hooks/useSignUp"
import { useState } from "react"

const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signup, error, loading } = useSignUp()

    const handleSignup = async (e) => {
        e.preventDefault()
        console.log(email, password)
        await signup(email, password)
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow mb-50" onSubmit={handleSignup}>
                <h1 className="text-2xl font-bold mb-6"> Sign Up</h1>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="w-full border rounded-lg px-3 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="*********"
                        className="w-full border rounded-lg px-3 py-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button disabled={loading} className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800">
                    Sign Up
                </button>
                {error && <div> {error}</div>}
            </form>

        </div>

    )
}

export default SignUpPage