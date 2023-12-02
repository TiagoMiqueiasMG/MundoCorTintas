
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const getJwtToken = async () => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          resolve(idToken);
        } catch (error) {
          reject(error);
        }
      } else {
        reject(new Error("Usuário não autenticado"));
      }
    });
  });
};
