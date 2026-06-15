import { useSignUp } from "../hooks/useSignUp"
import { useState } from "react"
import { Link } from "react-router"

const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signup, error, loading } = useSignUp()

    const handleSignup = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <form className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md" onSubmit={handleSignup}>
                <h1 className="text-2xl font-bold mb-6"> Sign Up</h1>
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
                    {loading ? "Creating account..." : "Sign Up"}
                </button>
                {error && <div className="alert alert-error text-sm py-2">{error}</div>}
            </form>

            <div className="text-center mt-4">
                <p className="text-sm">Already have an account? <Link className="link link-primary font-medium" to="/login">Sign In</Link></p>
            </div>
        </div>

    )
}

export default SignUpPage