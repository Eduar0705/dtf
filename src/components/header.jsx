import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../public/logo.png'

const Icons = {
  upload: <i className="fa-solid fa-upload"></i>,
  info: <i className="fa-solid fa-circle-info"></i>,
  user: <i className="fa-solid fa-user"></i>,
  userCheck: <i className="fa-solid fa-user-check"></i>,
  check: <i className="fa-solid fa-check"></i>,
  folder: <i className="fa-solid fa-folder-open"></i>,
  whatsapp: <i className="fa-brands fa-whatsapp"></i>,
  arrow: <i className="fa-solid fa-arrow-right"></i>
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handling hash scrolls when navigating from another page
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.pathname, location.hash]);

  const handleNavClick = (e, targetHash, targetPath = '/') => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === targetPath && targetHash) {
      document.getElementById(targetHash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', targetHash);
    } else {
      navigate(targetPath + (targetHash || ''));
    }
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo" onClick={(e) => handleNavClick(e, '', '/')} style={{ cursor: 'pointer' }}>
              <img src={Logo} alt="Logo DTF Mcy" style={{ width: '50px' }} />
            </div>
            <nav className="nav">
              <a href="/#hero" onClick={(e) => handleNavClick(e, '#hero', '/')}>Inicio</a>
              <a href="/#services" onClick={(e) => handleNavClick(e, '#services', '/')}>Servicios</a>
              <a href="/#prices" onClick={(e) => handleNavClick(e, '#prices', '/')}>Precios</a>
              <a href="/tienda" onClick={(e) => handleNavClick(e, '', '/tienda')}>Tienda</a>
              <a href="/galeria" onClick={(e) => handleNavClick(e, '', '/galeria')}>Galería</a>
              <a href="/#contact" onClick={(e) => handleNavClick(e, '#contact', '/')}>Contacto</a>
            </nav>

            {location.pathname === '/tienda' ? (
              <div className="header-store-controls">
                <div className="store-search-bar">
                  <input type="text" placeholder="Buscar productos..." />
                  <button className="store-search-btn">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
                <button className="store-cart-btn">
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span className="store-cart-badge">0</span>
                </button>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={(e) => handleNavClick(e, '#upload-section', '/')}>
                <span className="btn-icon">{Icons.upload}</span>
                Subir Diseño
              </button>
            )}

            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <a href="/#hero" onClick={(e) => handleNavClick(e, '#hero', '/')}>Inicio</a>
        <a href="/#services" onClick={(e) => handleNavClick(e, '#services', '/')}>Servicios</a>
        <a href="/#prices" onClick={(e) => handleNavClick(e, '#prices', '/')}>Precios</a>
        <a href="/tienda" onClick={(e) => handleNavClick(e, '', '/tienda')}>Tienda</a>
        <a href="/galeria" onClick={(e) => handleNavClick(e, '', '/galeria')}>Galería</a>
        <a href="/#contact" onClick={(e) => handleNavClick(e, '#contact', '/')}>Contacto</a>
        <button className="btn btn-primary" onClick={(e) => handleNavClick(e, '#upload-section', '/')}>
          Subir Diseño
        </button>
      </div>
    </>
  );
}