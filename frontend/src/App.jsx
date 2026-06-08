import { Routes, Route, Navigate } from "react-router";
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/movies" element={<Movies />} />

      </Routes>
    </>
  )
}

export default App
