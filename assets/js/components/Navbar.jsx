import React from "react";
import { Link } from "react-router-dom";
import LoginAPI from "../services/LoginAPI";

const Navbar = ({ isAuth, onLogout }) => {
  const handleLogout = () => {
    LoginAPI.logout();
    onLogout(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Symreact API
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Clients
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/invoices">
                Factures
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {isAuth && (
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger"
                >
                  Déconnexion
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
