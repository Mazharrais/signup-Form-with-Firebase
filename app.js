
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import Auth from fire base....
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
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





function signUp(){
    
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("error", errorMessage );
      });


  }

  document.getElementById("signUpBtn").addEventListener("click", signUp);


  function signIn(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    window.location = "dashboard.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });


  }


  document.getElementById("signInBtn").addEventListener("click", signIn);