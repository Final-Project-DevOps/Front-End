"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Edit, Search, MessageCircle, Bell, Menu, X } from "lucide-react"
import { fetchPosts, createPost, deletePost, editPost } from "../services/postService"
import { Link, useLocation } from "react-router-dom"

export default function Navbar() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: "", content: "" })
  const [editingPostId, setEditingPostId] = useState(null)
  const [posts, setPosts] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    fetchPostsData()
  }, [])

  const fetchPostsData = async () => {
    try {
      const data = await fetchPosts()
      setPosts(data)
    } catch (error) {
      console.error("Gagal mengambil data:", error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert("Pertanyaan tidak boleh kosong!")
      return
    }

    try {
      if (editingPostId) {
        await editPost(editingPostId, formData)
        setPosts(posts.map((post) => (post.id === editingPostId ? { ...post, ...formData } : post)))
      } else {
        const newPost = await createPost(formData)
        setPosts([...posts, newPost])
      }

      setFormData({ title: "", content: "" })
      setEditingPostId(null)
      setShowForm(false)
    } catch (error) {
      console.error("Gagal menyimpan pertanyaan:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Hapus pertanyaan ini?")) {
      try {
        await deletePost(id)
        fetchPostsData()
      } catch (error) {
        console.error("Gagal menghapus pertanyaan:", error)
      }
    }
  }

  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content })
    setEditingPostId(post.id)
    setShowForm(true)
  }

  const isHomePage = location.pathname === "/"

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 w-full sticky top-0 z-10 shadow-lg">
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-4">
          <Link to="/" className="flex items-center space-x-2">
            <MessageCircle className="h-7 w-7" />
            <h1 className="text-2xl font-bold">KnowHub</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="hover:text-white/80 transition-colors font-medium">
              Tentang Kami
            </a>
            <a href="#contact" className="hover:text-white/80 transition-colors font-medium">
              Kontak
            </a>

            <div className="relative">
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                className="bg-white/20 text-white placeholder-white/70 rounded-full px-4 py-1.5 pl-10 focus:outline-none focus:ring-2 focus:ring-white/50 w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
            </div>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-green-600 rounded-full px-4 py-2 flex items-center font-medium hover:bg-green-50 transition-colors shadow-sm"
            >
              <Plus size={18} className="mr-2" /> Tambah Pertanyaan
            </button>
            <Link
              to="/register"
              className="bg-green-700 hover:bg-green-800 text-white rounded-full px-5 py-2 font-medium transition-colors shadow-sm"
            >
              Daftar
            </Link>
            <Link to="/login" className="text-white hover:text-green-100 font-medium">
              Masuk
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-green-600 mt-3 p-4 rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="text-white hover:text-green-100 py-2 font-medium">
                Tentang Kami
              </a>
              <a href="#contact" className="text-white hover:text-green-100 py-2 font-medium">
                Kontak
              </a>

              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Cari pertanyaan..."
                  className="bg-white/20 text-white placeholder-white/70 rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-white/50 w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              </div>

              <div className="flex flex-col space-y-3 pt-3">
                <button
                  onClick={() => {
                    setShowForm(!showForm)
                    setMobileMenuOpen(false)
                  }}
                  className="bg-white text-green-600 rounded-full px-4 py-2 flex items-center justify-center font-medium"
                >
                  <Plus size={18} className="mr-2" /> Tambah Pertanyaan
                </button>
                <Link
                  to="/register"
                  className="bg-green-700 text-white rounded-full px-4 py-2 font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daftar
                </Link>
                <Link
                  to="/login"
                  className="text-white font-medium text-center py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      {isHomePage && (
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-6 pb-24">
          {/* Form untuk tambah/edit pertanyaan */}
          {showForm && (
            <div className="w-full bg-white border rounded-xl p-6 mb-8 shadow-lg">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingPostId ? "Edit Pertanyaan" : "Buat Pertanyaan Baru"}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Pertanyaan</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Masukkan pertanyaan Anda..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Detail (opsional)</label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Tambahkan detail untuk pertanyaan Anda..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
                  >
                    {editingPostId ? "Perbarui" : "Publikasikan"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* List post */}
          <div className="space-y-5">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="w-full bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-green-700 mb-2">{post.title}</h3>
                      {post.content && <p className="text-gray-600">{post.content}</p>}
                      <div className="flex items-center mt-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MessageCircle size={16} className="mr-1" /> 0 jawaban
                        </span>
                        <span className="mx-3">•</span>
                        <span>Ditanyakan 1 jam yang lalu</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50"
                        aria-label="Edit pertanyaan"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 ml-1"
                        aria-label="Hapus pertanyaan"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
                <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">Belum ada pertanyaan</h3>
                <p className="text-gray-500 mb-6">Jadilah yang pertama mengajukan pertanyaan!</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors font-medium shadow-sm"
                >
                  <Plus size={18} className="inline mr-2" /> Tambah Pertanyaan
                </button>
              </div>
            )}
          </div>

          {/* Tentang Kami Section */}
          <section id="about" className="mt-20 bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <MessageCircle size={24} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Apa itu KnowHub?</h2>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              KnowHub adalah platform diskusi dan berbagi ilmu berbasis komunitas, yang dikembangkan menggunakan
              pendekatan DevOps. Kami membangun platform ini untuk memudahkan pengguna berbagi pengetahuan dan
              mendapatkan jawaban dari komunitas.
            </p>
            <div className="bg-gray-50 p-5 rounded-lg mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Teknologi yang Kami Gunakan:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1.5 rounded-md mr-3 mt-0.5">
                    <div className="text-blue-600 text-xs font-bold">FE</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Frontend:</span>
                    <p className="text-gray-600 text-sm">React.js, dideploy menggunakan Docker + Nginx.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1.5 rounded-md mr-3 mt-0.5">
                    <div className="text-green-600 text-xs font-bold">BE</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Backend:</span>
                    <p className="text-gray-600 text-sm">Node.js, berbasis REST API dengan database PostgreSQL.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-purple-100 p-1.5 rounded-md mr-3 mt-0.5">
                    <div className="text-purple-600 text-xs font-bold">DEP</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Deployment:</span>
                    <p className="text-gray-600 text-sm">Menggunakan Docker Swarm untuk memastikan skalabilitas.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-100 p-1.5 rounded-md mr-3 mt-0.5">
                    <div className="text-orange-600 text-xs font-bold">CI</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">CI/CD:</span>
                    <p className="text-gray-600 text-sm">
                      GitHub Actions + Docker Hub/GHCR, memungkinkan update otomatis.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-red-100 p-1.5 rounded-md mr-3 mt-0.5">
                    <div className="text-red-600 text-xs font-bold">MON</div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Monitoring & Logging:</span>
                    <p className="text-gray-600 text-sm">Prometheus + Grafana untuk observabilitas sistem.</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Kontak Section */}
          <section id="contact" className="mt-16 bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Bell size={24} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Kontak</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">SA</span>
                </div>
                <p className="font-medium text-gray-800">Syifani Adillah Salsabila</p>
                <p className="text-gray-500 text-sm mt-1">DevOps Engineer</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">KA</span>
                </div>
                <p className="font-medium text-gray-800">Khaelano Abroor Maulana</p>
                <p className="text-gray-500 text-sm mt-1">DevOps Engineer</p>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">MG</span>
                </div>
                <p className="font-medium text-gray-800">Muhammad Gathan Raka</p>
                <p className="text-gray-500 text-sm mt-1">DevOps Engineer</p>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  )
}

