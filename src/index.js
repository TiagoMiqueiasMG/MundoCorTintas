import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Principal from "./pages/Principal/Principal";
import Login from "./pages/Login/Login"
import Ajuda from "./pages/Ajuda/Ajuda";
import Sobre from "./pages/SobreNos/Sobre";
import Cadastro from "./pages/Cadastro/Cadastro"


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" strict element={<Principal />} />
      <Route path="Login" strict element={<Login />} />
      <Route path="Ajuda" strict element={<Ajuda />} />
      <Route path="Sobre" strict element={<Sobre />} />
      <Route path="Cadastro" strict element={<Cadastro />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
