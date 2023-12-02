import React from 'react'
import "./Menu.css"
import { deslogarSistema } from '../firebase';

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <div className="menu-items">
        <h1>Configurações</h1>
        <a href="/">Calculadora</a>
        <a href="/ajuda">Ajuda</a>
        <a href="/login"
          onClick={
            () => {
              deslogarSistema()
                .then((resolve) => {
                  return;
                })
                .catch((reject, error) => {
                  return alert(error);
                })
            }
          }
        >Sair da Conta</a>
      </div>
      <span className="close-icon" onClick={onClose}>
        &times;
      </span>
    </div>
  );
};

export default Menu
