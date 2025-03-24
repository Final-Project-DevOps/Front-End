import React, { useState } from 'react';
import { Edit, Trash2, MessageSquare, Heart, Plus, User } from 'lucide-react';

export default function KnowHub() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    content: '',
    tags: ''
  });
  const [posts, setPosts] = useState([
    {
      id: '1',
      question: 'Apa framework JavaScript terbaik untuk pengembangan web modern?',
      content: 'Saya sedang mempertimbangkan beberapa opsi untuk proyek baru saya dan ingin tahu pendapat komunitas tentang React, Vue, dan Angular.',
      author: 'Budi Santoso',
      timestamp: '1 jam yang lalu',
      likes: 24,
      answers: 8,
      tags: ['JavaScript', 'Web Development', 'Framework']
    },
    {
      id: '2',
      question: 'Bagaimana cara meningkatkan performa website?',
      content: 'Website saya lambat saat loading. Apa saja langkah-langkah untuk mengoptimalkan performa website?',
      author: 'Siti Aminah',
      timestamp: '3 jam yang lalu',
      likes: 15,
      answers: 5,
      tags: ['Performance', 'Web Development', 'Optimization']
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.question.trim()) {
      alert('Pertanyaan tidak boleh kosong!');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      question: formData.question,
      content: formData.content,
      author: 'Anonim', // Bisa ganti dengan nama user login
      timestamp: 'Baru saja',
      likes: 0,
      answers: 0,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    setPosts([newPost, ...posts]);
    setFormData({ question: '', content: '', tags: '' });
    setShowForm(false);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus pertanyaan ini?')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-green-500 text-white py-3 px-4 w-full fixed top-0 left-0 z-10 shadow-lg">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <h1 className="text-xl md:text-2xl font-bold">KnowHub</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleForm}
              className="bg-white text-green-500 rounded-full px-2 py-1 md:px-3 md:py-1 flex items-center font-medium text-xs md:text-sm"
            >
              <Plus size={16} className="mr-1" /> <span className="hidden sm:inline">Tambah Pertanyaan</span><span className="sm:hidden">Tambah</span>
            </button>
            <button className="bg-transparent text-white p-1 rounded-full">
              <User size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-4xl pt-16"> {/* Extra padding-top to avoid overlap with fixed navbar */}
        {/* Tombol buat pertanyaan */}
        {!showForm && (
          <button 
            onClick={toggleForm}
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-green-600 transition-colors w-full sm:w-auto"
          >
            Buat Pertanyaan Baru
          </button>
        )}

        {/* Form buat pertanyaan */}
        {showForm && (
          <div className="mb-6 border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg md:text-xl font-medium text-gray-800">Buat Pertanyaan Baru</h2>
              <button 
                onClick={toggleForm}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors text-sm"
              >
                Batal
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Pertanyaan</label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Masukkan pertanyaan Anda di sini..."
                  className="w-full px-4 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Detail (opsional)</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Tambahkan detail untuk pertanyaan Anda..."
                  className="w-full px-4 py-2 border border-green-200 rounded-md h-24 md:h-32 focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Tag (pisahkan dengan koma)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="contoh: web, javascript, react"
                  className="w-full px-4 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 text-gray-800"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto"
                >
                  Publikasikan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Daftar pertanyaan */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="border rounded-lg p-4 shadow-sm mb-4 last:mb-0">
              <div className="flex justify-between items-start">
                <h3 className="text-base md:text-lg font-medium text-green-700 mb-1">{post.question}</h3>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => alert('Fitur edit belum tersedia')} 
                    className="text-green-500 hover:text-green-700"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(post.id)} 
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="text-xs md:text-sm text-gray-500 mb-2">
                <span className="text-green-600 font-medium">{post.author}</span> • {post.timestamp}
              </div>
              
              <p className="text-sm md:text-base text-gray-700 mb-3">{post.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center text-gray-500 hover:text-green-600 text-xs md:text-sm"
                >
                  <Heart size={14} className="mr-1" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-green-600 text-xs md:text-sm">
                  <MessageSquare size={14} className="mr-1" />
                  <span>{post.answers} Jawaban</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
