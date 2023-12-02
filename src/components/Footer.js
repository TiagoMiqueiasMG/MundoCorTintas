import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>
        <strong>Desenvolvedores:</strong>
      </p>
      <br></br>
      <p>Bruno Carolino Lopes, Bruno Junqueira Benetolo, Diego Lúcio de Paula Rocha, Gabriel Garcia, Pedro Henrique da Silva Góis, Tiago Miquéias Viana Rodrigue </p>
     <br></br>
      <p>
        <strong>Versão:</strong>
      </p>
      <p>1.1.0</p>
      <br></br>
      <div>
© Mundo Cor Tinta {new Date().getFullYear()}
      </div>
    </footer>
  );
};

export default Footer;
