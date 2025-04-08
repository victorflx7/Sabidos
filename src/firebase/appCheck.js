import { app } from './config';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Modifique esta linha para usar import.meta.env em vez de process.env
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true
});

export { appCheck };