import { NavLink, useNavigate } from "react-router";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
const Navbar = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()
    const logout = useLogout()
    const linkClass = ({ isActive }) =>
        isActive
            ? "bg-slate-900 text-white px-3 py-2 rounded-lg font-medium"
            : "text-slate-700 hover:bg-slate-100 px-3 py-2 rounded-lg font-medium transition";
    const handleClick = () => {
        logout()
        navigate("/login")
    }
    return (
        <nav className="bg-white border-b border-slate-200 shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <NavLink to="/dashboard" className="text-xl font-bold text-slate-900">
                    MFlix
                </NavLink>

                <div className="flex items-center gap-4">
                    {user && <span className="italic">{user.email}</span>}
                    {user &&
                        <NavLink to="/movies" end className={linkClass}>
                            Movies
                        </NavLink>
                    }
                    {user?.role === "admin" &&
                        <NavLink to="/movies/create" className={linkClass}>
                            Add Movie
                        </NavLink>
                    }
                    {user &&
                        <NavLink to="/users" className={linkClass}>
                            Users
                        </NavLink>
                    }
                    {!user &&
                        <NavLink to="/login" className={linkClass}>
                            Login
                        </NavLink>}

                    {user && <button onClick={handleClick} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50">Logout</button>}



                </div>
            </div>
        </nav>
    );
};

export default Navbar;