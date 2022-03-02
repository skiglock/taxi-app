import React from "react";
import "./main.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TaxiOrderList from "./components/TaxiOrderList";
import TaxiOrderCreate from "./components/TaxiOrderCreate";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" />} />
        <Route path="orders" element={<TaxiOrderList />} />
        <Route path="order/new" element={<TaxiOrderCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
