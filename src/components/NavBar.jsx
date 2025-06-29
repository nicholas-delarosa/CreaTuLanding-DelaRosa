import CartWidget from './CartWidget';

function NavBar({ cartCount }) {
    return (
        <nav className="navbar">
            <img src="/src/components/icon.png" alt="Logo tienda" className="navbar-logo" />
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