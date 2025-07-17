import { useState } from 'react';
import CartWidget from '../common/CartWidget';

function NavBar({ cartCount }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHamburger = () => setMenuOpen((open) => !open);

    return (
        <nav className="navbar" style={{ position: 'relative' }}>
            <img
                src="https://res.cloudinary.com/dw2auacau/image/upload/v1752717439/icon_uebyr0.png"
                alt="Logo tienda"
                className="navbar-logo"
            />
            <button className="hamburger" onClick={handleHamburger} aria-label="Abrir menú">
                <span style={{ transform: menuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none' }} />
                <span style={{ opacity: menuOpen ? 0 : 1 }} />
                <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }} />
            </button>
            <ul className={`navbar-links mobile${menuOpen ? ' open' : ''}`}>
                <li><a href="#" className="navbar-link" onClick={() => setMenuOpen(false)}>Inicio</a></li>
                <li><a href="#" className="navbar-link" onClick={() => setMenuOpen(false)}>Productos</a></li>
                <li><a href="#" className="navbar-link" onClick={() => setMenuOpen(false)}>Contacto</a></li>
            </ul>
            <ul className="navbar-links">
                <li><a href="#" className="navbar-link">Inicio</a></li>
                <li><a href="#" className="navbar-link">Productos</a></li>
                <li><a href="#" className="navbar-link">Contacto</a></li>
            </ul>
            <CartWidget cartCount={cartCount} />
        </nav>
    );
}

export default NavBar;