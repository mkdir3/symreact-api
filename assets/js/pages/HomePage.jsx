import React from "react";

const HomePage = (props) => {
  return (
    <div className="jumbotron p-4 m-4">
      <h1 className="display-3">Solution d'Api en React/Symfony</h1>
      <h3 className="lead pad-btn">Découvrez notre application.</h3>
      <p className="lead"></p>
      <div className="btn btn-primary m-2" href="/" id="a">
        Se connecter
      </div>
      <div className="btn btn-primary m-2" href="/">
        S'inscrire
      </div>
      <p></p>
    </div>
  );
};

export default HomePage;
