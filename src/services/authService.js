import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification
  } from "firebase/auth";
  import { app } from '../firebase/config';
  
  const auth = getAuth(app);
  
  // Cadastro
  export const cadastrarUsuario = async (email, senha) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    await sendEmailVerification(userCredential.user); // Opcional: envia confirmação
    return userCredential.user;
  };
  
  // Login
  export const fazerLogin = async (email, senha) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  };
  
  // Recuperar senha
  export const resetarSenha = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };