// FIREBASE
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

firebase.initializeApp(firebaseConfig);

export default firebase;