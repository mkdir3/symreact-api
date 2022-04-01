import React, { useState } from "react";
import LoginAPI from "../services/LoginAPI";

const LoginPage = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    LoginAPI.login(credentials)
      .then(setError(""))
      .then(onLogin(true))
      .catch((error) => {
        onLogin(false);
        setError("Aucun compte ne possède cette adresse email");
      });
  };

  return (
    <>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Adresse email</label>
          <input
            value={credentials.username}
            onChange={handleChange}
            type="text"
            placeholder="Adresse email"
            name="username"
            id="username"
            className={"form-control" + (error && " is-invalid")}
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            value={credentials.password}
            onChange={handleChange}
            type="text"
            placeholder="Mot de passe"
            name="password"
            id="password"
            className="form-control"
          />
        </div>
        <div className="form-group pt-4">
          <button type="submit" className="btn btn-success">
            Se connecter
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
