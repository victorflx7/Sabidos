import { getAnalytics, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, onSnapshot } from "firebase/firestore"; // Importações necessárias para Firestore

const firebaseConfig = {
    apiKey: "AIzaSyAP-mZxxpWRE8oejc25BF6At76qv0Q0ic8",
    authDomain: "sabidos-fc654.firebaseapp.com",
    projectId: "sabidos-fc654",
    storageBucket: "sabidos-fc654.firebasestorage.app",
    messagingSenderId: "772561215621",
    appId: "1:772561215621:web:1dc51f01a23c1dd68b09ec",
    measurementId: "G-T6L50TVSH5",
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app)

const db = getFirestore(app); // Inicializa o Firestore

export { db, collection, addDoc, query, onSnapshot, app, analytics, logEvent, auth };
