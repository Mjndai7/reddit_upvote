import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Home />} />
    <Route path="/products" element={<Home />} />
    <Route path="/affiliate" element={<Home />} />
    <Route path="/about" element={<Home />} />
    <Route path="/contact" element={<Home />} />
  </Routes>
);

export default Router;

