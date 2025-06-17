import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, handleToggleFavorite, isFavorite }) => {
  return (
    <div className="product-card">
      <button
        className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
        onClick={handleToggleFavorite}
      >
        <i
          className={`fa-heart ${isFavorite ? "fa-solid" : "fa-regular"}`}
        ></i>
      </button>

      <Link
        to={`/productos/${product.id}`}
        state={{ productIsFavorite: isFavorite }}
        className="product-link"
      >
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-details">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;