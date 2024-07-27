

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import Auth from fire base....
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFTo5ZmlSrwnn6Qh5sqYKevMpJXB0jbI4",
  authDomain: "signup-form-e629a.firebaseapp.com",
  projectId: "signup-form-e629a",
  storageBucket: "signup-form-e629a.appspot.com",
  messagingSenderId: "430959119670",
  appId: "1:430959119670:web:0eca4c2aaa78ad28dfb797"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);





function logOut(){

    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("Sign-out successful...");
      window.location = "index.html";
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });



}


document.getElementById("logOutBtn").addEventListener("click", logOut);

