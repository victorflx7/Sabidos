import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { app } from "../firebase/config";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(app);


export const criarPerfilUsuario = async (user) => {
  const docRef = doc(db, "usuarios", user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await setDoc(docRef, {
      nome: user.displayName || "",
      email: user.email,
      criadoEm: new Date().toISOString()
    });
  }
};


export const cadastrarUsuario = async (nome, email, senha) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);


    await updateProfile(userCredential.user, {
      displayName: nome
    });

    await criarPerfilUsuario(userCredential.user);


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
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);


    await criarPerfilUsuario(userCredential.user);

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


export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);


    await criarPerfilUsuario(result.user);

    return {
      success: true,
      user: result.user
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};



export const logoutUsuario = async () => {
  const auth = getAuth();

  try {
    await signOut(auth);
    console.log("Usuário deslogado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
};

