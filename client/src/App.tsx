import React from "react";
import "./main.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaxiOrderList from "./components/TaxiOrderList";
import TaxiOrderCreate from "./components/TaxiOrderCreate";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />
        <Route path="orders" element={<TaxiOrderList />} />
        <Route path="order/new" element={<TaxiOrderCreate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
