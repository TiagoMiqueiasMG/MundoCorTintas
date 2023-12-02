// import './App.css';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Principal from "./pages/Principal/Principal";
import Login from "./pages/Login/Login";
import Ajuda from "./pages/Ajuda/Ajuda";
import Sobre from "./pages/SobreNos/Sobre"
import Cadastro from "./pages/Cadastro/Cadastro";

function App() {
  return (
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
}

export default App;
