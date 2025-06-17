import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="nav-bar">
            <div className="links">
                <ul>
                    <li><Link to={"/"}>Inicio</Link></li>
                    <li><Link to={"/favorites"}>Favoritos</Link></li>
                </ul>
            </div>
            <div className="logo-nav">
                <img src="/logo.png" alt="Logo" />
            </div>
        </nav>
    );
};

export default NavBar;