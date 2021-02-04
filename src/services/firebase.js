// FIREBASE
// import * as firebase from "firebase/app";
// import "firebase/auth";
// const firebaseConfig = {
//    apiKey: "AIzaSyCilaA1Udc6eb5-p6dqXBojwKkgZZmDqKE",
//    authDomain: "dash-7174b.firebaseapp.com",
//    databaseURL: "https://dash-7174b.firebaseio.com",
//    projectId: "dash-7174b",
//    storageBucket: "dash-7174b.appspot.com",
//    messagingSenderId: "574978950662",
//    appId: "1:574978950662:web:3cd732f85f03a77a756587",
//    measurementId: "G-SKECN57H46"
// };
// firebase.initializeApp(firebaseConfig);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // disabling the auth system that comes w/ firebase

import * as firebase from "firebase/app";
import "firebase/auth";
import { processColor } from "react-native";
const firebaseConfig = {
   // apiKey: `${process.env.REACT_APP_API_KEY}`,
   apiKey: "AIzaSyCilaA1Udc6eb5-p6dqXBojwKkgZZmDqKE",
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   databaseURL: process.env.REACT_APP_DATRABASE_URL,
   projectId: process.env.REACT_APP_PROJ_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
   measurementId: process.env.REACT_APP_MEASURMENT_ID
};

// class Firebase {
//    constructor() {
//       firebase.app.initializeApp(firebaseConfig);
// //       // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE); // disabling the auth system that comes w/ firebase
//    }
// }
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export default firebase;