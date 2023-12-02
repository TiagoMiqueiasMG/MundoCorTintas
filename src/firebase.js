import * as firebase from '@firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@firebase/auth';
import axios from 'axios';
import Cookies from 'js-cookie';

const firebaseConfig = {
  apiKey: "AIzaSyCyo_fcjey1eUpDrykcT_88coWRZ48wKu0",
  authDomain: "mundo-cor-tintas.firebaseapp.com",
  projectId: "mundo-cor-tintas",
  storageBucket: "mundo-cor-tintas.appspot.com",
  messagingSenderId: "207385576830",
  appId: "1:207385576830:web:a7af4a4c72833631a15f2f"
};

const Firebase = firebase.initializeApp(firebaseConfig);

const logarSistema = async (email, senha) => {
  const auth = await getAuth();
  return new Promise((resolve, reject) => {
    if (email !== '' && senha !== '') {
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          auth.currentUser.getIdToken()
            .then((token) => {
              Cookies.set('userLogged', userCredential.user.uid, { expires: 0.1 });
              Cookies.set('jwtToken', token, { expires: 0.1 });
              resolve(true);
            })
            .catch((error) => {
              alert('Não foi possivel recuperar o token de autenticação.')
            })

        })
        .catch((error) => {
          reject(false);
        })
    } else {

    }

  })
};

const deslogarSistema = async () => {
  const auth = await getAuth();
  return new Promise((resolve, reject) => {
    try {
      Cookies.remove('userLogged');
      Cookies.remove('jwtToken');
      signOut(auth);
      resolve(true);
    } catch (error) {
      reject(false);
    }
  })


}

const cadastrarUsuario = async (nome, email, senha) => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then(() => {
        auth.currentUser.getIdToken()
          .then((token) => {
            const config = {
              headers: {
                'Authorization':`Bearer ${token}`
              }
            }
            const data = {
              nome: nome,
              email: email
            }
            axios.post("https://calcularfrete.azurewebsites.net/usuarios/criar", data, config)
              .then((response) => {
                resolve(true);
              })
              .catch((e) => { alert('Erro ao fazer a requisição na api.') })
          })
          .catch((e) => alert('Erro ao recuperar o token do usuário.'))

      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('Email inválido.');
            break;
          case 'auth/email-already-in-use':
            alert('Usuário já cadastrado');
            break;
        }
        reject(false);
      })
  })
}

export { Firebase, logarSistema, deslogarSistema, cadastrarUsuario };