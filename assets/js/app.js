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

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Routes, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import LoginAPI from "./services/LoginAPI";
import AuthContext from "./contexts/AuthContext";
import { createBrowserHistory } from "history";
import CustomerPage from "./pages/CustomerPage";

export const history = createBrowserHistory();

LoginAPI.setup();

const App = () => {
  const [isAuth, setIsAuth] = useState(LoginAPI.isAuthenticated());

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <HashRouter history={history}>
        <Navbar history={history} />
        <main className="container pt-3">
          <Routes>
            <Route
              path="/login"
              element={<LoginPage history={history} />}
            ></Route>
            {isAuth && (
              <Route path="/customers" element={<CustomersPage />}></Route>
            )}
            {isAuth && (
              <Route path="/customer/:id" element={<CustomerPage />}></Route>
            )}
            {isAuth && (
              <Route path="/invoices" element={<InvoicesPage />}></Route>
            )}
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDOM.render(<App />, rootElement);
