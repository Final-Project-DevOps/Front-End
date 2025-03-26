import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Daftar from './components/LoginRegister';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white-900 text-black">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <Routes>
            {/* Route untuk halaman pendaftaran */}
            <Route path="/daftar" element={<Daftar />} />
            {/* Tambahkan route lain jika perlu */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
