import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Shop from "./pages/Shop";
import { Provider } from 'react-redux';
import store from './store';
import ProductCart from "./pages/ProductCart";
import ProductCheckout from "./pages/ProductCheckout";
const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div className="wrapper ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/cart" element={<ProductCart/>}/>
          <Route path="/checkout" element={<ProductCheckout/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
    </Provider>
  );
};

export default App;
