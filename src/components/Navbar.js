import React from 'react';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between'
    }}>
      <div className="logo">React Firebase DevOps</div>
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '1rem'
      }}>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
