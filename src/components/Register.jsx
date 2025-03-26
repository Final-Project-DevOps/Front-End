"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from "lucide-react"

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === "password") {
      // Simple password strength calculation
      let strength = 0
      if (value.length >= 8) strength += 1
      if (/[A-Z]/.test(value)) strength += 1
      if (/[0-9]/.test(value)) strength += 1
      if (/[^A-Za-z0-9]/.test(value)) strength += 1
      setPasswordStrength(strength)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle registration logic here
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!")
      return
    }
    console.log("Registration data:", formData)
  }

  const handleTermsClick = (e) => {
    e.preventDefault()
    // Bisa menampilkan modal atau navigasi ke halaman syarat & ketentuan
    console.log("Terms and conditions clicked")
  }

  const handlePrivacyClick = (e) => {
    e.preventDefault()
    // Bisa menampilkan modal atau navigasi ke halaman kebijakan privasi
    console.log("Privacy policy clicked")
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Daftar di KnowHub</h1>
          <p className="text-gray-600">Mulai perjalanan berbagi pengetahuan Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                placeholder="nama@email.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                placeholder="Minimal 8 karakter"
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>

            {/* Password strength indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Kekuatan Password:</span>
                  <span className="text-xs font-medium">
                    {passwordStrength === 0 && "Lemah"}
                    {passwordStrength === 1 && "Cukup"}
                    {passwordStrength === 2 && "Sedang"}
                    {passwordStrength === 3 && "Kuat"}
                    {passwordStrength === 4 && "Sangat Kuat"}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${
                      passwordStrength === 0
                        ? "bg-red-500 w-1/4"
                        : passwordStrength === 1
                          ? "bg-orange-500 w-2/4"
                          : passwordStrength === 2
                            ? "bg-yellow-500 w-3/4"
                            : "bg-green-500 w-full"
                    }`}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CheckCircle size={18} className="text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                placeholder="Ulangi password Anda"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Password tidak cocok</p>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                Saya setuju dengan{" "}
                <button onClick={handleTermsClick} className="text-green-600 hover:text-green-700">
                  Syarat & Ketentuan
                </button>{" "}
                dan{" "}
                <button onClick={handlePrivacyClick} className="text-green-600 hover:text-green-700">
                  Kebijakan Privasi
                </button>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
          >
            Daftar Sekarang
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

