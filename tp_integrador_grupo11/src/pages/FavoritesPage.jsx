import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/favoriteSlice";

import { Link } from "react-router-dom";
import "./FavoritesPage.css";

const FavoritesPage = () => {
  const favoriteProducts = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  // Función para desmarcar un producto como favorito
  const handleRemoveFavorite = (productId) => {
    dispatch(removeFavorite(productId));
  };

  return (
    <div className="favorites-container">
      <h1>Mis Productos Favoritos</h1>
      {favoriteProducts.length === 0 ? (
        <p>No tienes productos marcados como favoritos aún.</p>
      ) : (
        <div className="card-container">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="img-card">
                <Link to={`/productos/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                </Link>
              </div>
              <div className="info-card">
                <Link to={`/productos/${product.id}`} className="product-link">
                  <h3>{product.title}</h3>
                </Link>
                <p>Precio: ${product.price}</p>
                <button onClick={() => handleRemoveFavorite(product.id)}>
                  Desmarcar como Favorito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;