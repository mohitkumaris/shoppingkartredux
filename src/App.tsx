//import ProductComponent from "./pages/Product/ProductComponent";
import LoginComponent from "components/Login/LoginComponent";
import ProductComponent from "pages/Product/ProductComponent";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="/shopping" element={<ProductComponent />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
