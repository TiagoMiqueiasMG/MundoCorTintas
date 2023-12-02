import React, { useState } from "react";
// css
import "./Principal.css";
//componentes
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import TabNavigator from "../../components/TabNavigator"

//Cookies de autenticação
import Cookies from "js-cookie";
//tab navigation


const Principal = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  //Função responsavel por mudar o estado do menu ao clicar no icone.
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  //Verificação de sessão ativa, para evitar acesso ao sistema sem login.
  if (Cookies.get("userLogged") === undefined) {
    window.location.href = "/login";
  } else {
    return (
      <div className="principal">
        <Header isOpen={menuOpen} onToggleMenu={toggleMenu} />
        <TabNavigator />
        <Menu isOpen={menuOpen} onClose={toggleMenu} />
      </div>
    );
  }
};

export default Principal;
