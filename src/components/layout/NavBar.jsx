import { useState } from 'react';
import CartWidget from '../common/CartWidget';
import { Link } from 'react-router';

function NavBar({ cartCount }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHamburger = () => setMenuOpen((open) => !open);

    return (
        <nav className="navbar" style={{ position: 'relative' }}>
            <Link to="/"><img
                src="https://res.cloudinary.com/dw2auacau/image/upload/v1752717439/icon_uebyr0.png"
                alt="Logo tienda"
                className="navbar-logo"
            /></Link>
            <button className="hamburger" onClick={handleHamburger} aria-label="Abrir menú">
                <span style={{ transform: menuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none' }} />
                <span style={{ opacity: menuOpen ? 0 : 1 }} />
                <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none' }} />
            </button>
            <ul className={`navbar-links mobile${menuOpen ? ' open' : ''}`}>
                <li>
                    <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to="/categorias" className="navbar-link" onClick={() => setMenuOpen(false)}>
                        Productos
                    </Link>
                </li>
                <li>
                    <Link to="#" className="navbar-link" onClick={() => setMenuOpen(false)}>
                        Contacto
                    </Link>
                </li>
            </ul>
            <ul className="navbar-links">
                <li>
                    <Link to="/" className="navbar-link">
                        Inicio
                    </Link>
                </li>
                <li>
                    <Link to="/categorias" className="navbar-link">
                        Productos
                    </Link>
                </li>
                <li>
                    <Link to="#" className="navbar-link">
                        Contacto
                    </Link>
                </li>
            </ul>
            <Link to="/carrito"><CartWidget cartCount={cartCount} /></Link>
        </nav>
    );
}

export default NavBar;