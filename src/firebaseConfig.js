// import { initializeApp } from "firebase/app";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "SUA_API_KEY",
//   authDomain: "SEU_DOMINIO.firebaseapp.com",
//   projectId: "SEU_PROJECT_ID",
//   storageBucket: "SEU_BUCKET.appspot.com",
//   messagingSenderId: "SEU_SENDER_ID",
//   appId: "SEU_APP_ID"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize App Check
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('SEU_SITE_KEY_RECAPTCHA'),
//   isTokenAutoRefreshEnabled: true
// });

// // Initialize Authentication
// const auth = getAuth(app);

// export { auth };