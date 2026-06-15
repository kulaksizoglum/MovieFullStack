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
        const success = await login(email, password)
        if (success) {

            navigate("/movies")
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md" onSubmit={(e) => loginHandler(e)}>
                <h1 className="text-2xl font-bold mb-6"> Login</h1>
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text font-medium">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        className="input input-bordered w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="label">
                        <span className="label-text font-medium">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button disabled={loading} className="btn btn-primary w-full">
                    {loading ? "Logging in..." : "Login"}
                </button>
                {error && <div className="alert alert-error text-sm py-2">{error}</div>}
                <div className="text-center mt-4">
                    <p className="text-sm">Don't have an account? <Link className="link link-primary font-medium" to="/signup">Sign Up</Link></p>
                </div>
            </form>

        </div>
    )
}

export default LoginPage