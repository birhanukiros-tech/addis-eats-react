import { Link } from "react-router-dom";
import CartBadge from "../cart/CartBadge";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Addis Eats</Link>

            <div>
                <Link to="/">Home</Link>

                <Link to="/menu">Menu</Link>

                <Link to="/favorites">Favorites</Link>
                <Link to="/cart">Cart<CartBadge /></Link>
            </div>
        </nav>
    );
}

export default Navbar;