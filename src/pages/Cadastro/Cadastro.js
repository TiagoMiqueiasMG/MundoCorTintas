import React, { useState } from "react";
import "./Cadastro.css";
import { cadastrarUsuario } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [iconShowPassword, setIconPassword] = useState('fas fa-eye');
  const [passwordShown, setPasswordShown] = useState(false);
  const [typeInputPassword, setTypeInputPassword] = useState('password');

  const showPassword = () => {
    if (passwordShown) {
      setPasswordShown(!passwordShown);
      setIconPassword('fa-solid fa-eye');
      setTypeInputPassword('password');

    } else {
      setPasswordShown(!passwordShown);
      setIconPassword('fa-regular fa-eye-slash');
      setTypeInputPassword('text');
    }
  }

  const novoUsuario = async (email, senha) => {
    if (senha === confirmaSenha) {
      if (validaEmail(email)) {
        cadastrarUsuario(nome, email, senha)
          .then((resolve) => {
            navigate('/login');
          })
          .catch((reject) => {
            alert('Não foi possivel efetuar o cadastro do usuário.')
          });
      } else {
        alert('Email fornecido inválido.')
      }
    } else {
      alert('As senhas fornecidas são diferentes.')
    }
  }
  const validaEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="container center">
      <div className="background-img">
        <img src="background.jpg" alt="Background lata de tinta azul" />
      </div>
      <div className="content">
        <div className="voltar">
          <a href="/login">
            <i className="fas fa-arrow-left"></i>
          </a>
          <h1 className="title">Novo Usuário</h1>
        </div>
        <div className="form-container ">
          <form>
            <div className="form-group">
              <input type="text" id="nome" name="nome" placeholder="Nome" value={nome} onChange={(e)=>{setNome(e.target.value)}} required />
            </div>
            <div className="form-group">
              <input type="email" id="email" name="email" placeholder="E-mail" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
            </div>
            <div className="form-group">
              <div className="password-input">
                <input type={typeInputPassword} id="senha" name="senha" placeholder="Senha" value={senha} onChange={(e)=>{setSenha(e.target.value)}} required />
                <span onClick={showPassword}>
                  <i className={iconShowPassword} id="show-password"></i>
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="password-input">
                <input type={typeInputPassword} id="senha" name="senha" placeholder="Confirmar Senha" value={confirmaSenha} onChange={(e)=>{setConfirmaSenha(e.target.value)}} required />
              </div>
            </div>
            <button type="button" className="btn-cadastro" onClick={()=>novoUsuario(email,senha)}>Cadastrar</button>
          </form>

        </div>
      </div>

    </div>
  );
}

export default Cadastro
