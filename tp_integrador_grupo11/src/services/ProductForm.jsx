import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  editProduct,
  selectProductById,
} from "../redux/productSlice";

import "./ProductForm.css";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: {
      rate: "",
      count: "",
    },
  });

  const existingProduct = useSelector((state) =>
    productId ? selectProductById(state, parseInt(productId, 10)) : null
  );

  useEffect(() => {
    if (productId && existingProduct) {
      setFormData({
        title: existingProduct.title || "",
        price: existingProduct.price || "",
        description: existingProduct.description || "",
        category: existingProduct.category || "",
        image: existingProduct.image || "",
      });
    } else if (productId && !existingProduct) {
   console.warn(`Producto con ID ${productId} no encontrado para edición.`);
    }
  }, [productId, existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.price ||
      !formData.description ||
      !formData.category ||
      !formData.image
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const productToSave = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (productId) {
      // Modo edición
      dispatch(
        editProduct({
          id: parseInt(productId, 10),
          updatedProduct: productToSave,
        })
      );
      alert("Producto actualizado con éxito (simulado en el estado global).");
    } else {
      dispatch(addProduct(productToSave));
      alert("Producto añadido con éxito (simulado en el estado global).");
    }

    navigate("/");
  };

  return (
    <div className="product-form-container">
      <h2>{productId ? "Editar Producto" : "Crear Nuevo Producto"}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="title">Nombre del Producto:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen:</label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {productId ? "Actualizar Producto" : "Añadir Producto"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="cancel-button"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;