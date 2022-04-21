import React, { useState, useContext } from "react";
import Field from "../components/forms/Field";
import AuthContext from "../contexts/AuthContext";
import LoginAPI from "../services/LoginAPI";

const LoginPage = ({ history }) => {
  const { setIsAuth } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await LoginAPI.login(credentials);
      setError("");
      setIsAuth(true);
      history.replace("#/customers");
    } catch (error) {
      console.log(error);
      setError(
        "Aucun compte ne possède cette adresse email ou alors les informations ne correspondent pas !"
      );
    }
  };

  return (
    <>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <Field
          label="Adresse e-mail"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Adresse e-mail"
          error={error}
        />
        <Field
          name="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error=""
        />
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
