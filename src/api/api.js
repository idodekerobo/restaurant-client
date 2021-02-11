import firebase, { auth } from '../services/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalContext } from '../context/GlobalState';
import { SET_LOADING } from '../context/ActionCreators';
// can make this an .env variable
// const API_URL = 'http://localhost:5000/api/';
// NGROK TUNNELING
const API_URL = 'https://f68c251c5c3d.ngrok.io' + '/api/';
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

// ASYNC STORAGE FUNCTIONS
// export const storeTokenInAsyncStorage = async (token) => {
//    try {
//       // have to stringify the object since async storage only takes string values
//       // await AsyncStorage.setItem('userObject', JSON.stringify(user));
//       console.log(`token in store user async function ${token}`);
//       await AsyncStorage.setItem('userToken', token);
//       console.log(`Saved user in async storage`);
//    } catch (error) {
//       console.log(`There was an error saving user in async storage ${error}`);
//    }
// }
export const getUserFromAsyncStorage = async () => {
   try {
      const token = await AsyncStorage.getItem('userIdToken');
      if (token !== null) {
         return token;
      }
      console.log(`token is null`)
   } 
   catch (e) {
      console.log(`error: ${e}`)
   }
}


export async function checkAuthStatus() {
   let URL = API_URL + 'auth/';
   let idToken;
   
   try {
      const idToken = await getUserFromAsyncStorage(); // this isn't waiting
      if (idToken !== null) {
         // console.log(`this is the id token will check firebase if it's valid next ${idToken}`)
         try {
            const response = await fetch(URL, {
               method: 'GET', 
               headers: new Headers({
                  'Content-type': 'application/json',
                  Authorization: `Bearer ${idToken}`,
               })
            })
            const authObject = await response.json();
            return authObject;
         } catch (e) {
            console.log(`error.code ${e.code}`)
            console.log(`error msg ${e.message}`);
            console.log(`full error ${e}`)
            return res.status(401).send({error: 'There was an error checking token on server.'});
         }
      } else {
         let result = 'not authorized';
         return result;
      }
   } catch (e) {
      console.log(`There was an error in checkAuthStatus function: ${e}`);
   }
}

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