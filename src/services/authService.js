import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { app } from '../firebase/config';

const auth = getAuth(app);

export const cadastrarUsuario = async (nome, email, senha) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    
    await updateProfile(userCredential.user, {
      displayName: nome
    });

      
    // 3. Envia email de verificação (opcional)
  //  await sendEmailVerification(userCredential.user);

    return { 
      success: true,
      user: userCredential.user 
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

export const fazerLogin = async (email, senha) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};