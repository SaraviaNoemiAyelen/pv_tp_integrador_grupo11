import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import { Provider } from "react-redux";
import Header from "./views/Header/Header.jsx";
import ProductForm from "./services/ProductForm.jsx";
import Footer from "./views/Footer/Footer.jsx";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/create-product" element={<ProductForm />} />
        <Route path="/edit-product/:productId" element={<ProductForm />} />
      </Routes>
      <Footer></Footer>
    </>
  );
}

export default App;
