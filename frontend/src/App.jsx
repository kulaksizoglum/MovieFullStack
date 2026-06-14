import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard"
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </>
  )
}

export default App
