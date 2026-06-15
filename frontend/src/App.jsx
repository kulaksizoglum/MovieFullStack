import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"
import CreateMovie from "./pages/CreateMovie";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { user } = useAuthContext()
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/dashboard" />} />
        <Route path="/movies" element={user ? <Movies /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/movies/create" element={user?.role === "admin" ? <CreateMovie /> : <Navigate to="/dashboard" />} />
      </Routes>
    </>
  )
}

export default App
