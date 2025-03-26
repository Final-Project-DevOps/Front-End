import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-green-500 text-white py-8 text-center text-sm fixed bottom-0 w-full">
      <div className="mb-4">
        <p>© {new Date().getFullYear()} KnowHub. Semua Hak & Pengetahuan Dilindungi.</p>
      </div>
      
      <div className="flex justify-center space-x-6 mb-4">
        <a 
          href="https://www.instagram.com/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-emerald-300"
        >
          <i className="fab fa-instagram"></i> Instagram
        </a>
        <a 
          href="https://www.facebook.com/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-emerald-300"
        >
          <i className="fab fa-facebook"></i> Facebook
        </a>
        <a 
          href="https://twitter.com/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-emerald-300"
        >
          <i className="fab fa-twitter"></i> Twitter
        </a>
        <a 
          href="https://www.linkedin.com/in/yourprofile" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-emerald-300"
        >
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
      </div>
    </footer>
  );
}
