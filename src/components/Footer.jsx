import React from 'react';
import { Instagram, Facebook, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white py-8 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">KnowHub</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Platform diskusi dan berbagi ilmu berbasis komunitas, dikembangkan dengan pendekatan DevOps modern.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-white/80">
              <li><Link to="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><a href="#about" className="hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Bantuan</h3>
            <ul className="space-y-2 text-white/80">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/panduan" className="hover:text-white transition-colors">
                  Panduan Pengguna
                </Link>
              </li>
              <li>
                <Link to="/privasi" className="hover:text-white transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Hubungi Kami</h3>
            <p className="text-white/80 text-sm mb-2">Email: info@knowhub.id</p>
            <p className="text-white/80 text-sm">Telepon: +62 123 4567 890</p>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/80 mb-4 md:mb-0">
            © {new Date().getFullYear()} KnowHub. Dibuat dengan <Heart size={14} className="inline text-red-300" /> di Indonesia.
          </p>
          
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.facebook.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a 
              href="https://twitter.com/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/yourprofile" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
