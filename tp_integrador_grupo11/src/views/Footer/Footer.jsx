import React from "react";
import "./Footer.css"; // Importa el archivo CSS

function Footer() {
  const currentYear = new Date().getFullYear(); // Obtiene el año actual dinámicamente

  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Acerca De</h3>
          <p>
            En VioletShop creemos en ofrecer productos únicos <br />
            con estilo y calidad. Tu satisfacción es nuestra prioridad. <br />
            Envíos a todo el país y atención rápida por WhatsApp o redes.
          </p>
        </div>

        <div className="footer-section contact">
          <h3>Contáctanos</h3>
          <p>
            <i className="fa-solid fa-envelope"></i> VioletShop@gmail.com
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> +54 3885045094
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> Jujuy, Argentina
          </p>
        </div>

        <div className="footer-section social">
          <h3>Síguenos</h3>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Todos los derechos reservados.</p>
        <p>Desarrollado con ❤️ en React.</p>
      </div>
    </footer>
  );
}

export default Footer;
