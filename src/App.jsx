import React from 'react';
import KnowHub from './components/KnowHub';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <KnowHub />
      </div>
      <Footer />
    </div>
  );
}

export default App;