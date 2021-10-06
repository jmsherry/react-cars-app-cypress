import React from 'react';
import Header from '../components/Header/Header';

function MainLayout({children}) {
  return (
    <div className="page">
    <Header />
    <main>
    <div className="container">
    {children}
    </div>
    </main>
  </div>
  )
}

export default MainLayout;
