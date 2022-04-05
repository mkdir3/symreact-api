import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const HomePage = ({}) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <div className="jumbotron p-4 m-4">
      <h1 className="display-3">Solution d'Api en React/Symfony</h1>
      <h3 className="lead pad-btn">Découvrez notre application.</h3>
      <p className="lead"></p>
      {!isAuth && (
        <Link className="btn btn-primary m-2" to="/login">
          Se connecter
        </Link>
      )}
      {!isAuth && (
        <Link className="btn btn-primary m-2" to="/register">
          S'inscrire
        </Link>
      )}
      <p></p>
    </div>
  );
};

export default HomePage;
