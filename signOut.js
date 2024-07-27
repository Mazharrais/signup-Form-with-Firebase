

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import Auth from fire base....
import { getAuth, signOut, onAuthStateChanged, sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// import fireStore from fire base...
import { getFirestore, collection, addDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


let userEmail;
let docId;





function updateProfile(){
 if(document.getElementById("profileBtn").value == "Update Profile"){
    
 }




}





function validateUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            if (!user.emailVerified) {
                window.alert("Kindly verify your email in order to proceed");
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        // Email verification sent!
                        window.location = "index.html";
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(errorMessage);
                    });
            }
            else {
                userEmail = user.email;
                const querySnapshot = await getDocs(collection(db, "students"));
                querySnapshot.forEach((userDoc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                if(doc.data().email == userEmail){
  
                  docId = userDoc.id;
                  document.getElementById("fname").value = doc.data().first;
                   document.getElementById("mname").value = doc.data().middle;
                   document.getElementById("lname").value = doc.data().last;
                   document.getElementById("profileBtn").value = "update profile";
                   document.getElementById("profileBtn").addEventListener("click",updateProfile);
                }
             });
            }
            // ...
        } else {
            // User is signed out
            window.location = "index.html";
            // ...
        }
    });
  }
  validateUser();


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



const createProfile = async () => {

    try {
        const docRef = await addDoc(collection(db, "users"), {
          first : document.getElementById("fname").value,
          middle : document.getElementById("mname").value,
          last : document.getElementById("lname").value,
         email : userEmail,
         
         
        });
        // console.log(userEmail);
        console.log("Document written with ID: ", docRef.id);
         docId = docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }



}


document.getElementById("profileBtn").addEventListener("click", createProfile)