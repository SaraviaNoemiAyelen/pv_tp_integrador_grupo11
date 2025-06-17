import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./Header.css";
import { Link } from "react-router-dom";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function Header() {
  const dispatch = useDispatch();

  const {
    data: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const shuffledProductsRow1 =
    products.length > 0
      ? [...shuffleArray(products), ...shuffleArray(products)]
      : [];
  const shuffledProductsRow2 =
    products.length > 0
      ? [...shuffleArray(products), ...shuffleArray(products)]
      : [];
  const shuffledProductsRow3 =
    products.length > 0
      ? [...shuffleArray(products), ...shuffleArray(products)]
      : [];

  return (
    <header>
  <div className="promo-banner">
    <h1 className="promo-text">Agregar promociones</h1>
  </div>


  <div className="main-content">
    <div className="logo"></div>
    <div className="text">
      <p></p>
    </div>
  </div>
</header>
  );
}

export default Header;