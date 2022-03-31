/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "../styles/app.css";

// start the Stimulus application
import "./bootstrap";

import React from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Routes, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <main className="container pt-3">
        <Routes>
          <Route path="/customers" element={<CustomersPage />}></Route>
          <Route path="/invoices" element={<InvoicesPage />}></Route>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
