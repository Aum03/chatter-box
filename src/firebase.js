import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCivoRRXLApF54nz70C_Gu-ajcOSG_iIHQ",
  authDomain: "chatter-box-5b3ff.firebaseapp.com",
  projectId: "chatter-box-5b3ff",
  storageBucket: "chatter-box-5b3ff.appspot.com",
  messagingSenderId: "135116451793",
  appId: "1:135116451793:web:f97590ec30a8bac3877af0",
  measurementId: "G-G5334C3653" 
})
  
const auth = firebase.auth();

export { auth };
