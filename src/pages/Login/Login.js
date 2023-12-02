import React, { useState } from "react";
import "./Login.css";
import Firebase from "../../firebase";
import { logarSistema } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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
  const login = async () => {
    if (validaEmail(email)) {
      await logarSistema(email, senha)
        .then((response)=>{
          if(response){
            navigate('/');
          }
        })
        .catch((reject, error)=>{
          alert('Não foi possivel fazer o login.')
        });
    } else {
      alert('Email com formato inválido, por favor verifique e tente novamente.')
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
    <div class="container">
      <div class="background-img">
        <img src="background.jpg" alt="Background lata de tinta azul" />
      </div>
      <div class="content">
        <h1 class="titulo">Mundo Cor Tintas</h1>
        <div class="form-container ">
          <form>
            <div class="form-group">
              <input type="email" id="email" name="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div class="form-group">
              <div class="password-input">
                <input type={typeInputPassword} id="senha" name="senha" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                <span onClick={showPassword}>
                  <i class={iconShowPassword} id="show-password"></i>
                </span>
              </div>
            </div>
            <button type="button" class="btn-login" onClick={login}>Entrar</button>
          </form>
          <div class="form-cadastro">
            <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;
