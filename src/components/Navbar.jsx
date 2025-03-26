import React, { useState, useEffect } from 'react';
import { Trash2, Plus, User, Edit } from 'lucide-react';
import { fetchPosts, createPost, deletePost, editPost } from '../services/postService';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [editingPostId, setEditingPostId] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPostsData();
  }, []);

  const fetchPostsData = async () => {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Pertanyaan tidak boleh kosong!');
      return;
    }

    try {
      if (editingPostId) {
        await editPost(editingPostId, formData);
      } else {
        await createPost(formData);
      }
      setFormData({ title: '', content: '' });
      setEditingPostId(null);
      setShowForm(false);
      fetchPostsData();
    } catch (error) {
      console.error("Gagal menyimpan pertanyaan:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus pertanyaan ini?')) {
      try {
        await deletePost(id);
        fetchPostsData();
      } catch (error) {
        console.error("Gagal menghapus pertanyaan:", error);
      }
    }
  };

  const handleEdit = (post) => {
    setFormData({ title: post.title, content: post.content });
    setEditingPostId(post.id);
    setShowForm(true);
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-green-500 text-white py-4 px-4 w-full sticky top-0 z-10 shadow-md">
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">KnowHub</h1>
          <nav className="flex items-center space-x-4">
            <Link to="/about" className="hover:text-emerald-300">Tentang Kami</Link>
            <Link to="/contact" className="hover:text-emerald-300">Kontak</Link>
            <Link to="/privacy-policy" className="hover:text-emerald-300">Kebijakan Privasi</Link>
            <Link to="/terms-of-service" className="hover:text-emerald-300">Syarat & Ketentuan</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-green-500 rounded-full px-4 py-2 flex items-center font-medium"
            >
              <Plus size={20} className="mr-2" /> Tambah Pertanyaan
            </button>
            {/* <Link to="/login" className="bg-transparent text-white p-2 rounded-full">
              <User size={24} />
            </Link> */}
              <Link to="/register" className="bg-green text-white-500 rounded-full px-4 py-2 font-medium">
                Daftar
            </Link>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-6">
        {/* Form untuk tambah/edit pertanyaan */}
        {showForm && (
          <div className="w-full bg-white border rounded-lg p-6 mb-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {editingPostId ? 'Edit Pertanyaan' : 'Buat Pertanyaan Baru'}
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Batal
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Pertanyaan</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Masukkan pertanyaan Anda..."
                  className="w-full px-4 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Detail (opsional)</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Tambahkan detail untuk pertanyaan Anda..."
                  className="w-full px-4 py-2 border border-green-200 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                />
              </div>
              
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  {editingPostId ? 'Perbarui' : 'Publikasikan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List post */}
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="w-full bg-white border rounded-lg p-4 shadow-sm flex items-start">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-green-700 mb-2">{post.title}</h3>
                {post.content && (
                  <p className="text-gray-600 text-sm">{post.content}</p>
                )}
              </div>
              <button 
                onClick={() => handleEdit(post)} 
                className="text-blue-500 hover:text-blue-700 ml-4"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => handleDelete(post.id)} 
                className="text-red-500 hover:text-red-700 ml-4"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
