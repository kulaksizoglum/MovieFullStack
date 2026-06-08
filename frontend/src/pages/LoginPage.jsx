import { Link, useNavigate } from "react-router"
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, loading } = useLogin()

    const loginHandler = async (e) => {
        e.preventDefault()
        await login(email, password)
        navigate("/movies")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow mb-50" onSubmit={(e) => loginHandler(e)}>
                <h1 className="text-2xl font-bold mb-6"> Login</h1>
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
                    Login
                </button>
                {error && <div> {error}</div>}
                <div className="p-4 mt-4">
                    <p>Don't have an account? <Link className="btn  btn-ghost ml-24" to="/signup"> Sign Up</Link></p>
                </div>
            </form>

        </div>
    )
}

export default LoginPage