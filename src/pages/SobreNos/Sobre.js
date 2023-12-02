import React, { useState, useEffect } from "react";

// Componentes
import Menu from "../../components/Menu";
import Header from "../../components/Header";

const Sobre = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Importação necessária para que não pegue configuração de bory  de login
  // Caso a configuração seja resolvida, apagamos esse useEffert
  useEffect(() => {
    // Adicione a classe específica quando o componente montar
    document.body.classList.add("ajuda-page-body");

    // Remova a classe quando o componente desmontar
    return () => {
      document.body.classList.remove("ajuda-page-body");
    };
  }, []);

  return (
    <div className="principal">
      <Header isOpen={menuOpen} onToggleMenu={toggleMenu} />
      <Menu isOpen={menuOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Sobre;
