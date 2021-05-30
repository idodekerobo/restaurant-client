import firebase, { auth } from '../services/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

// Local Host
// const API_URL = 'http://localhost:5000/api/';
// NGROK TUNNELING
// export const API_URL = 'https://8fb9fc6c5ab8.ngrok.io' + '/api/';

// can make this an .env variable
export const API_URL = 'https://www.rhemi.co/api/';
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
                                                        UTILITY FUNCTIONS
=================================================================================================================================
*/
export const wait = (timeout) => {
   return new Promise(resolve => {
      setTimeout(resolve, timeout);
   });
}

/*
=================================================================================================================================
                                                        FIREBASE
=================================================================================================================================
*/
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
   // let idToken;
   
   try {
      const idToken = await getUserFromAsyncStorage();
      if (idToken !== null) {
         // console.log(`this is the id token will check firebase if it's valid next ${idToken}`)
         try {
            // IOS DOESN'T ALLOW HTTP REQUESTS BY DEFAULT. ONLY HTTPS
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
            console.log(`the try/catch block for the fetch auth status endpoint isn't working`);
            console.log(`error.code ${e.code}`)
            console.log(`error msg ${e.message}`);
            console.log(`full error ${e}`)
            const auth = { }
            return auth;
            // return;
            // return res.status(401).send({error: 'There was an error checking token on server.'});
         }
      } else {
         console.log(`no id token present`)
         let result = 'not authorized';
         return result;
      }
   } catch (e) {
      console.log(`There was an error in checkAuthStatus function: ${e}`);
   }
}

export async function sendIdTokenToServer(idToken) {
   const URL = API_URL + '/signin'
   try {
      const response = await fetch(URL, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify({
            idToken
         }),
      })
      const json = response.json();
      return json;
   } catch (e) {
      console.log(`There was an error sending idtoken to database at sign in ${e}`)
      return;
   }
}

export async function signOutUser() {
   // need to remove push token of device from restaurant object on the database
   const URL = API_URL + 'signout'   
   let restaurantId;

   // getting restaurandId from async
   try {
      id = await AsyncStorage.getItem('restaurantId');
      if (id !== null && id !== '') restaurantId = id;
   } catch (e) {
      console.log(`error getting restaurant id from async store ${e}`);
   }

   // need to remove device token from async storage
   try {
      // await AsyncStorage.removeItem('userIdToken');
      await AsyncStorage.multiRemove(['userIdToken', 'restaurantId']);
      console.log();
      console.log('successfully removed user id token and restaurant id from async storage')
      try {
         await firebase.auth().signOut(); // sign out in firebase
         
         try {
            const token = await Notifications.getExpoPushTokenAsync();
            // fetch to remove the token if it's already present
            const response = await fetch(URL, {
               method: 'POST',
               headers: {
                  'Content-type': 'application/json',
               },
               body: JSON.stringify({
                  clientToken: {
                     restaurantId,
                     value: token
                  }
               })
            });
            // const responseJson = await response.json();
         } catch (e) {
            console.log(`There was an error removing the token from the restaurant on the database ${e}`);
         }

      } catch (e) {
         console.log(`There was an error signing out: ${e}`);
         alert(`Sign out was unsuccessful. Please try again later.`);
      }

   } catch (e) {
      console.log(`Error removing device id token from async storage at sign out ${e}`);
      alert(`Sign out was unsuccessful. Please try again later.`);
   }
   
}

/*
=================================================================================================================================
                                                        ORDERS
=================================================================================================================================
*/
// get all orders
export async function getAllOrders(idToken) {

   const URL = API_URL + 'order/';
   return fetch(URL, {
      method: 'GET',
      headers: new Headers({
         'Content-type': 'application/json',
         Authorization: `Bearer ${idToken}`,
      })
   })
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

/*
=================================================================================================================================
                                                        MENU
=================================================================================================================================
*/
export async function getMenuData() {
   const URL = API_URL + 'menu/';

   return fetch(URL, {
      method: 'GET',
      headers:  {
         'Content-type': 'application/json'
      },
   })
   .then(resp => {
      return resp.json();
   })
   .then(jsonData => {
      return jsonData;
   })
   .catch(err => catchBlock(err))
}

/*
=================================================================================================================================
                                                        EDIT MENU
=================================================================================================================================
*/
export const saveNewMenuName = async (_id, name) => {
   const URL = API_URL + 'editMenuName';
   console.log('running function that is supposed to fetch backend and save this as menu name', name);
   return fetch(URL, {
      method: 'POST',
      headers:  {
         'Content-type': 'application/json'
      },
      body: JSON.stringify({
         _id,
         name
      })
   })
   .then(resp => {
      // console.log(resp);
      return resp;
      // return resp.json();
   })
   // .then(jsonData => {
   //    return jsonData;
   // })
   .catch(err => catchBlock(err))
}

export const saveNewCategoryName = async (_id, name) => {
   const URL = API_URL + 'editCategory';
   // console.log(`saving this category ${_id} w/ this updated name: ${name}`);

   return fetch(URL, {
      method: 'POST', 
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify({
         _id,
         name
      })
   })
   .then(resp => {
      return resp;
   })
   .catch(err => catchBlock(err));
}

export const saveNewItemName = async (_id, name) => {
   const URL = API_URL + 'editItemName';

   return fetch(URL, {
      method: 'POST', 
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify({
         _id,
         name
      })
   })
   .then(resp => {
      return resp;
   })
   .catch(err => catchBlock(err));
}

export const sendEditedItemToDB = async (newItemObject) => {
   const URL = API_URL + 'editItem';
   console.log(`running api function that will send edit item on the database`);

   return fetch(URL, {
      method: 'POST', 
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify({ // the { } around newItemObject causes the object to be nested into req.body.{ } 
         newItemObject
      })
   })
   .then(resp => {
      return resp;
   })
   .catch(err => catchBlock(err));
}

export const addOptionToItem = async (newItemData) => {
   const URL = API_URL + 'editItemOptions';
   console.log(`running api function that will send new item option to database`);
   // console.log(`sending this item to db`);
   // console.log(newItemData);
   return fetch(URL, {
      method: 'POST', 
      headers: {
         'Content-type': 'application/json'
      },
      body: JSON.stringify({
         newItemObject: newItemData
      })
   })
   .then(resp => {
      return resp;
   })
   .catch(err => catchBlock(err));
}