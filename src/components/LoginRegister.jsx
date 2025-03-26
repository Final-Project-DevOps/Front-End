import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Daftar() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    konfirmasiPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasiPassword, setShowKonfirmasiPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi password
    if (formData.password !== formData.konfirmasiPassword) {
      alert('Password tidak cocok');
      return;
    }

    // Logika pendaftaran
    console.log('Data Pendaftaran:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-600">KnowHub</h1>
          <p className="text-gray-600 mt-2">Buat Akun Baru</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <div className="flex items-center border border-green-200 rounded-md">
              <User className="ml-3 text-green-500" size={20} />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <div className="flex items-center border border-green-200 rounded-md">
              <Mail className="ml-3 text-green-500" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <div className="flex items-center border border-green-200 rounded-md">
              <Lock className="ml-3 text-green-500" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-3 text-green-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Konfirmasi Password */}
          <div>
            <label className="block text-gray-700 mb-2">Konfirmasi Password</label>
            <div className="flex items-center border border-green-200 rounded-md">
              <Lock className="ml-3 text-green-500" size={20} />
              <input
                type={showKonfirmasiPassword ? 'text' : 'password'}
                name="konfirmasiPassword"
                value={formData.konfirmasiPassword}
                onChange={handleChange}
                placeholder="Konfirmasi password"
                className="w-full px-4 py-2 rounded-md focus:outline-none"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowKonfirmasiPassword(!showKonfirmasiPassword)}
                className="mr-3 text-green-500"
              >
                {showKonfirmasiPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors font-semibold mt-4"
          >
            Daftar
          </button>
        </form>

        {/* Link Masuk */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Sudah punya akun? {' '}
            <a href="/login" className="text-green-600 font-semibold hover:underline">
              Masuk
            </a>
          </p>
        </div>

        {/* Pemisah atau opsi lain */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4">
            <hr className="w-1/4 border-gray-300" />
            <span className="text-gray-500">atau</span>
            <hr className="w-1/4 border-gray-300" />
          </div>
          
          {/* Tombol Daftar Sosial Media */}
          <div className="mt-4 space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Daftar dengan Facebook
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Daftar dengan Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}