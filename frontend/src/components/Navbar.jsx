import { NavLink, useNavigate } from "react-router";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const logout = useLogout()
    const linkClass = ({ isActive }) =>
        isActive
            ? "bg-slate-900 text-white px-3 py-2 rounded-lg"
            : "text-slate-700 hover:bg-slate-900 hover:text-white px-3 py-2 rounded-lg";
    const handleClick = () => {
        logout()
        navigate("/login")
    }
    return (
        <nav className="bg-white border-b border-slate-200 shadow-sm font-serif">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <NavLink to="/dashboard" className="text-xl font-bold text-slate-900">
                    MFlix
                </NavLink>

                <div className="flex items-center gap-2">
                    {user && <span className="italic">{user.user.email}</span>}
                    <NavLink to="/" end className={linkClass}>
                        Movies
                    </NavLink>

                    <NavLink to="/movies/create" className={linkClass}>
                        Add Movie
                    </NavLink>

                    <NavLink to="/users" className={linkClass}>
                        Users
                    </NavLink>
                    {!user &&
                        <NavLink to="/login" className={linkClass}>
                            Login
                        </NavLink>}

                    {user && <button onClick={handleClick} className="btn btn-ghost text-red-500">Logout</button>}



                </div>
            </div>
        </nav>
    );
};

export default Navbar;