import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllProducts,
  selectProductsStatus,
  fetchProducts,
} from "../redux/productSlice";

import "./SearchResultsPage.css"; 

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get("name")?.toLowerCase() || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="search-results" style={{ padding: "1rem" }}>
      <h2>Resultados de búsqueda para "{searchTerm}"</h2>

      {status === "loading" && <p>Cargando productos...</p>}

      {status === "succeeded" && filteredProducts.length > 0 && (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>Precio: USD {product.price.toFixed(2)}</p>
              <p>Stock: {product.rating?.count || "N/A"}</p>
              <button onClick={() => navigate(`/productos/${product.id}`)}>
                Ver más
              </button>
            </div>
          ))}
        </div>
      )}

      {status === "succeeded" && filteredProducts.length === 0 && (
        <p>No se encontraron productos.</p>
      )}

      {status === "failed" && <p>Error al cargar productos.</p>}

      <button onClick={handleBack} style={{ marginTop: "20px" }}>
        Volver
      </button>
    </div>
  );
};

export default SearchResultsPage;