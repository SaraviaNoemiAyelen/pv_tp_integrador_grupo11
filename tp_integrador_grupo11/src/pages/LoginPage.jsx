import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/userSlice";

import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña.");
      return;
    }

    try {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      const user = existingUsers.find((u) => u.email === email);

      if (user && user.password === password) {
        const sessionInfo = { email: user.email, name: user.name || "Usuario" };
        dispatch(loginUser(sessionInfo));

        navigate("/");
      } else {
        setError("Credenciales inválidas. Verifica tu correo y contraseña."); //
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return (
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      {error && <p class="error-message">{error}</p>}
      <form class="login-form" onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div class="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" class="login-button">
          Iniciar Sesión
        </button>
      </form>
      <p class="signup-link">
        ¿No tienes una cuenta?
        <span onClick={() => navigate("/register")}>Regístrate aquí</span>
      </p>
    </div>
  );
};

export default LoginPage;