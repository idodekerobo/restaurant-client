import firebase, { auth } from '../services/firebase'
// can make this an .env variable
// const API_URL = 'http://localhost:5000/api/';
// NGROK TUNNELING
const API_URL = 'https://1022ebf236a0.ngrok.io' + '/api/';
/*
=================================================================================================================================
                                                        ERROR HANDLING
=================================================================================================================================
*/
function errorHandling(resp) {
   if (!resp.ok) { // resp is not okay on network failure or something preventing the request from completeing
      if (resp.status >= 400 && resp.status < 500) { // status is from 400-500 on client errors
         return resp.json().then(data => {
            let err = { errMessage: data.message };
            console.log('This is the err', err);
            throw err;
         });
      } else { // there's a network failure or something stopping the req from completing
         let err = { errMessage: 'Please try again  later. There\'s something wrong in the cloud' };
         throw err;
      }
   }
};

function catchBlock(err) {
   // throw error
   console.log("There was an error, please see below.");
   console.log(err);
}

/*
=================================================================================================================================
                                                        FIREBASE
=================================================================================================================================
*/

// send sign in credentials to firebase
export async function login(email, password, navigationProp, nextScreen) {
   
   // this endpoint will need to check if credentials are valid
   // const URL = API_URL + 'login/';
   // Firebase.
   auth()
   .signInWithEmailAndPassword(email, password)
   .then( (fbObj) => {
      console.log('sign-in worked');
      console.log(fbObj)
      // console.log(`this is the user ${fbObj.user}`);
      navigationProp.navigate(nextScreen);
      return fbObj.user.getIdToken();
   })
   .then(token => {
      // console.log(`token ${token}`)
   })
   .catch(err => {
      // Handle Errors here.
      console.log('there was some type of error');
      let errorCode = err.code;
      let errorMessage = err.message;
      console.log(`this is the error code ${errorCode}`);
      console.log(`this is the error message ${errorMessage}`)
      switch (err.code) {
         case "auth/invalid-email":
         case "auth/user-disabled":
         case "auth/user-not-found":
            // set the error for all three
            break;
         case "auth/wrong-password":
            // set password error message
            break;
      }
   });
}

export async function checkAuthStatus() {
   // firebase.auth().onAuthStateChanged(user => {
   //    if (user) console.log(`logged in`)
   // })

   let URL = API_URL + 'auth/';
   const idToken = await firebase.auth().currentUser.getIdToken();

   console.log();
   console.log(`id token ${idToken}`);
   console.log();

   fetch(URL, {
      method: 'GET', 
      headers: new Headers({
         'Content-type': 'application/json',
         Authorization: `Bearer ${idToken}`,
      })
   })
   .then(res => {
      return res.data;
   })

   // let token;
   // if (loggedIn) token = await firebase.auth().currentUser.getIdToken();
   // console.log(`token ${token}`);
}


export async function retrieveAuthToken() {
   const URL = API_URL + 'auth/';
   firebase
   .auth()
   .currentUser.getIdToken(/* forceRefresh */ true)
   .then(idToken => {
      // send idToken to backend via https
      return fetch(URL, {
         method: 'GET',
         headers: new Headers({
            'Content-type': 'application/json',
            Authorization: `Bearer ${idToken}`
         }),
         // body: JSON.stringify(idToken)
      })
      // DO I NEED THIS
      .then(resp => {
         errorHandling(resp);
         // console.log(`resp ${resp}`);
         // console.log(`resp stringify ${JSON.stringify(resp)}`);
         // console.log(`resp.json ${resp.json()}`);
         // console.log(`resp.json stringify ${JSON.stringify(resp.json())}`);
         return resp.json({resp}); // if response is okay then convert to json and return
      })
      // DO I NEED THIS
      .then(jsonData => {
         console.log(`jsondata ${jsonData}`);
         return jsonData; // take that jsondata and return it 
      })
      .catch(err => {
         console.log(`error in fetch`)
         console.log(`error code ${err.code}`);
         console.log(`error message ${err.message}`);
         catchBlock(err)
      });
   })
   .catch(err => {
      console.log(`error in firebase method`)
      catchBlock(err)
   });
   
}

/*
export function createUser(email, password) {
   firebase.auth().createUserWithEmailAndPassword(email, password)
   .then( ({user}) => {
      return user.getIdToken().then( (idToken) => {
         return fetch("/loginSession", {
            method: 'POST', 
            headers: {
               Accept: 'application/json', 
               "Content-Type": "application/json",
               // defend against CSRF attacks
               // "CSRF-Token": Cookies.get("XSRF-TOKEN")
            },
            body: JSON.stringify({idToken})
         })
      })
   })
   .then( () => {
      return firebase.auth().signOut();
   })
   .then( () => {
      // window.location.assign("/some-page?");
   })
}
*/

// export function authListener() {
//    firebase
//    .auth()
//    .onAuthStateChanged( (user) => {
//       if (user) {
//          console.log('user is signed in');
//       } else {
//          console.log('user is signed out');
//       }
//    });
// }

/*
=================================================================================================================================
                                                        ORDERS
=================================================================================================================================
*/
// get all orders
export async function getAllOrders() {

   const URL = API_URL + 'order/';
   return fetch(URL, {method: 'GET'})
   .then(resp => {
      errorHandling(resp);
      return resp.json(); // if response is okay then convert to json and return
   })
   .then(jsonData => {
      return jsonData; // take that jsondata and return it 
   })
   .catch(err => catchBlock(err));
}

// update specific order status
export async function updateOrderStatus(orderId, readyStatus, paidStatus, pickedUpStatus) {
   const URL = API_URL + 'order/' + orderId;
   return fetch(URL, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         ready: readyStatus,
         paid: paidStatus,
         pickedUp: pickedUpStatus,
      })
   })
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      return jsonData
   })
   .catch(err => catchBlock(err));
}