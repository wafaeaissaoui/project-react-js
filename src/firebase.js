// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   };

  import firebase from "firebase";
  const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyC8Y575BLhj13UXO5BCUy8qnfe9zJBwH7w",
    authDomain: "instagram-clone-d461b.firebaseapp.com",
    projectId: "instagram-clone-d461b",
    storageBucket: "instagram-clone-d461b.appspot.com",
    messagingSenderId: "554722880790",
    appId: "1:554722880790:web:f9d5261fdcb110f2553437",
    measurementId: "G-ND27LCL5T8"

  });
  const db=firebaseApp.firestore();
  const auth= firebase.auth();
  const storage= firebase.storage();
  export{db,auth,storage};