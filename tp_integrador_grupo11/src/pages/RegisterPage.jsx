import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !password || !confirmPassword) {
            setError("Todos los campos obligatorios deben ser completados.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
            setError("El formato del correo electrónico no es válido.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setError("La contraseña y la confirmación no coinciden.");
            return;
        }

        try {
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

            const userExists = existingUsers.some(
                (user) => user.email === normalizedEmail
            );

            if (userExists) {
                setError("Este correo electrónico ya está registrado.");
                return;
            }

            const newUser = {
                email: normalizedEmail,
                password,
                name: name.trim() || "Usuario",
            };

            const updatedUsers = [...existingUsers, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            setSuccess("Registro exitoso. Serás redirigido al login.");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setName("");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (err) {
            console.error("Error al registrar usuario:", err);
            setError("Error al registrar usuario. Intente de nuevo.");
        }
    };

    return (
        <div className="register-container">
            <h2>Registro de Usuario</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre (Opcional):</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">
                    Registrarse
                </button>
            </form>
            <p className="login-link">
                ¿Ya tienes una cuenta?
                <span onClick={() => navigate("/login")}>Inicia sesión aquí</span>
            </p>
        </div>
    );
};

export default RegisterPage;
