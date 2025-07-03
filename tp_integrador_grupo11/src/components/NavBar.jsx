import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice.js";

import "./NavBar.css";

const NavBar = () => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <div className="logo-nav">
          <img src="/logo.png" alt="Logo" />
        </div>
        {isAuthenticated && currentUser && (
          <div className="user-info">
            Bienvenido, {currentUser.name}
          </div>
        )}
      </div>

      <div className="nav-right">
        <div className="links">
          <ul>
            <li>
              <Link to="/" className="nav-button">Inicio</Link>
            </li>
            <li>
              <Link to="/favorites" className="nav-button">Favoritos</Link>
            </li>
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/register" className="nav-button">Registrarse</Link>
                </li>
                <li>
                  <Link to="/login" className="nav-button">Iniciar Sesión</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {isAuthenticated && currentUser && (
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        )}
      </div>
</nav>
  );
};

export default NavBar;