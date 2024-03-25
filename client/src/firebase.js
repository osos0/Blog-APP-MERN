// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_MERN_API_KEY,
  apiKey: "AIzaSyBVbq7YDYncac3xSUfP0WHMDjVNdgzhwrU",
  authDomain: "my-first-mern-project-657d1.firebaseapp.com",
  projectId: "my-first-mern-project-657d1",
  storageBucket: "my-first-mern-project-657d1.appspot.com",
  messagingSenderId: "113985287342",
  appId: "1:113985287342:web:47a2e466421c6618b4293f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
