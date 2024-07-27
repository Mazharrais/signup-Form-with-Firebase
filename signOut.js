

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
// import Auth from fire base....
import { getAuth, signOut, onAuthStateChanged, sendEmailVerification} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
// import fireStore from fire base...
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
// import storage from fire base...
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

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
// Initiallize Storage from fire base.....
const storage = getStorage();

let userEmail;
let docId;


 const deleteProfile = async () => {
 if(docId){
    await deleteDoc(doc(db, "users", docId));
    console.log("Deleted", docId);
 }
 }







function updateProfile(){
 if(document.getElementById("profileBtn").value == "Update Profile"){
    deleteProfile();
 }


 // firebase storage code fro firebase......


 var file = document.getElementById("displayPicture").files[0];

  const storageRef = ref(storage, `${file.name}.jpg`);

const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);


}

document.getElementById("profileBtn").addEventListener("click", updateProfile);


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
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((userDoc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                if(userDoc.data().email == userEmail){
  
                  docId = userDoc.id;
                  document.getElementById("fname").value = userDoc.data().first;
                   document.getElementById("mname").value = userDoc.data().middle;
                   document.getElementById("lname").value = userDoc.data().last;
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



const createProfile = async (pictureURL) => {

    try {
        const docRef = await addDoc(collection(db, "users"), {
          first : document.getElementById("fname").value,
          middle : document.getElementById("mname").value,
          last : document.getElementById("lname").value,
         email : userEmail,
         picture: pictureURL
         
         
        });
        // console.log(userEmail);
        console.log("Document written with ID: ", docRef.id);
         docId = docRef.id
      } catch (e) {
        console.error("Error adding document: ", e);
      }



}


  document.getElementById("profileBtn").addEventListener("click", createProfile);