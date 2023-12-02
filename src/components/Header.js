import React from "react";
import './Header.css'

const Header = ({ isOpen, onToggleMenu }) => {
  return (
    <div className="header-content">
      <header className={`header-container ${isOpen ? "menu-open" : ""}`}>
        <div className="hamburger-menu" onClick={onToggleMenu}>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
          <div className={`bar ${isOpen ? "open" : ""}`}></div>
        </div>
        <div className="logo">
          <span>Mundo Cor Tintas</span>
        </div>
      </header>
    </div>

  );
};

export default Header;
