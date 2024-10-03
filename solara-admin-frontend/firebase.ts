// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBPxYTMk2ZXTZaNnBDLKHUvJLH-g_JpFOs",
    authDomain: "solara-admin-frontend.firebaseapp.com",
    projectId: "solara-admin-frontend",
    storageBucket: "solara-admin-frontend.appspot.com",
    messagingSenderId: "204601464412",
    appId: "1:204601464412:web:a246282ef562f1381f3899",
    measurementId: "G-QT9VQH14YM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);