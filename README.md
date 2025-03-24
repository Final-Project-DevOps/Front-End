# React Firebase DevOps Project

## Deskripsi Proyek

Proyek ini adalah implementasi Continuous Integration/Continuous Deployment (CI/CD) menggunakan GitHub Actions dan Firebase Hosting untuk aplikasi React. Tujuan utama dari proyek ini adalah untuk memahami proses automasi deployment dengan menggunakan GitHub Actions dan Firebase, serta cara pengelolaan versi dengan Git.

## Proses Pengerjaan

### 1. Inisialisasi Repository GitHub

- Membuat repository GitHub baru dengan nama `react-firebase-devops`.
- Clone repository ke lokal dan membuat branch baru `dev` untuk pengembangan.
- Commit pertama berisi setup awal proyek.

git clone https://github.com/syifaniads/react-firebase-devops.git
cd react-firebase-devops
git checkout -b dev
git add .
git commit -m "Initial setup"
git push origin dev

### 2. Pengembangan Aplikasi React

- Menggunakan `create-react-app` untuk memulai aplikasi React.
- Menambahkan komponen Navbar pada `src/App.js`.
- Membuat branch baru `feature-navbar`, lalu commit dan push perubahan tersebut.
- Membuka Pull Request (PR) dari `feature-navbar` ke `dev` dan melakukan merge.

npx create-react-app .

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

git checkout -b feature-navbar
git add .
git commit -m "Add Navbar component"
git push origin feature-navbar

### 3. Manajemen Branch dan Merge Conflict

- Membuat branch baru `feature-footer` dan menambahkan komponen Footer.
- Melakukan modifikasi struktur Navbar di branch `dev` dan commit perubahan.
- Membuka PR dari `feature-footer` ke `dev` dan menyelesaikan merge conflict.

export default function Footer() {
return (
<footer className="bg-green-500 text-white py-8 text-center text-sm fixed bottom-0 w-full">
<div className="mb-4">
<p>© {new Date().getFullYear()} KnowHub. Semua Hak & Pengetahuan Dilindungi.</p>
</div>
<div className="flex justify-center space-x-6 mb-4">
<a href="https://www.instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
<i className="fab fa-instagram"></i> Instagram
</a>
<a href="https://www.facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
<i className="fab fa-facebook"></i> Facebook
</a>
<a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
<i className="fab fa-twitter"></i> Twitter
</a>
<a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-300">
<i className="fab fa-linkedin"></i> LinkedIn
</a>
</div>
<div className="text-sm">
<a href="/about" className="hover:text-emerald-300 mx-2">Tentang Kami</a>
<a href="/contact" className="hover:text-emerald-300 mx-2">Kontak</a>
<a href="/privacy-policy" className="hover:text-emerald-300 mx-2">Kebijakan Privasi</a>
<a href="/terms-of-service" className="hover:text-emerald-300 mx-2">Syarat & Ketentuan</a>
</div>
</footer>
);
}

git checkout -b feature-footer
git add .
git commit -m "Add Footer component"
git push origin feature-footer

### 4. Konfigurasi CI/CD dengan GitHub Actions

- Membuat folder `.github/workflows` dan menambahkan file `firebase-deploy.yml` untuk konfigurasi CI/CD.
- Menambahkan langkah-langkah dalam workflow untuk:
  - Checkout repository
  - Install dependencies & build aplikasi
  - Deploy ke Firebase Hosting

  name: Firebase Deploy
on:
push:
branches:
- main-clean # Workflow only runs when pushing to the 'main' branch
jobs:
build:
runs-on: ubuntu-latest # Uses the latest Ubuntu environment
steps:
- name: Checkout code
uses: actions/checkout@v3 # Checkout code from repository
- name: Set up Node.js
uses: actions/setup-node@v3
with:
node-version: '18' # Using Node.js version 18
- name: Install dependencies
run: |
npm install
- name: Build the project
run: |
npm run build
- name: Install Firebase CLI
run: |
npm install -g firebase-tools
- name: Deploy to Firebase Hosting
run: |
firebase deploy --only hosting --non-interactive --token ${{ secrets.FIREBASE_TOKEN }} --project fir-react-devops

### 5. Deployment ke Firebase Hosting

- Menginstall dan login ke Firebase CLI.
- Mengkonfigurasi Firebase Hosting di aplikasi React.
- Mengambil Firebase CI Token dan menambahkannya sebagai GitHub Secret.
- Melakukan push ke branch `main` dan memantau hasil deployment di GitHub Actions.

firebase login
firebase init hosting
firebase ci:token

## URL Aplikasi

Aplikasi dapat diakses melalui [Firebase Hosting](https://fir-react-devops.web.app/).

## URL Repository

Repository GitHub proyek ini dapat diakses di [https://github.com/syifaniads/react-firebase-devops](https://github.com/syifaniads/react-firebase-devops).

## Instalasi

Untuk menjalankan aplikasi ini secara lokal, ikuti langkah-langkah berikut:

1. Clone repository ini:

   ```bash
   git clone https://github.com/syifaniads/react-firebase-devops.git



<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
