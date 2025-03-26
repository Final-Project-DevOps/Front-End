import "./App.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Register from "./components/Register"
import Login from "./components/Login"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "@fortawesome/fontawesome-free/css/all.min.css"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-grow py-8">
          <Routes>
            <Route path="/" element={null} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App

