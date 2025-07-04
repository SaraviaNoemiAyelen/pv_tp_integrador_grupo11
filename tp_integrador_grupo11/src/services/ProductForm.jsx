import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addProduct,
  editProduct,
  selectProductById,
} from "../redux/productSlice";
import { showSuccess, showWarning, confirmAction, showError } from "../utils/alerts";

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
    stock: "",
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
        stock:
          existingProduct.stock !== undefined
            ? existingProduct.stock.toString()
            : "",
      });
    } else if (productId && !existingProduct) {
      showError("No se encontró el producto para editar.");
      navigate("/");
    }
  }, [productId, existingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.price ||
      !formData.description ||
      !formData.category ||
      !formData.image ||
      formData.stock === ""
    ) {
      showWarning("Por favor, completá todos los campos antes de continuar.");
      return;
    }

    const productToSave = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };

    const confirmed = await confirmAction({
      title: productId ? "¿Confirmar modificación?" : "¿Confirmar creación?",
      text: productId
        ? "Vas a modificar los datos del producto."
        : "Estás por crear un nuevo producto.",
      confirmButtonText: productId ? "Sí, modificar" : "Sí, crear",
    });

    if (!confirmed) {
      showWarning("Operación cancelada por el usuario.");
      return;
    }

    if (productId) {
      dispatch(
        editProduct({
          id: parseInt(productId, 10),
          updatedProduct: productToSave,
        })
      );
      showSuccess("El producto fue actualizado correctamente.");
    } else {
      dispatch(addProduct(productToSave));
      showSuccess("El nuevo producto se ha creado exitosamente.");
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
          <select
            className="form-select"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná una categoría</option>
            <option value="Joyería">Joyería</option>
            <option value="Ropa de Hombre">Ropa de Hombre</option>
            <option value="Ropa de Mujer">Ropa de Mujer</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Hogar">Hogar</option>
            <option value="Deportes">Deportes</option>
          </select>
        </div>

        {/* NUEVO CAMPO STOCK */}
        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
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

export default ProductForm;
