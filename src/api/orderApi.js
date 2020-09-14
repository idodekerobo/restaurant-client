// can make this an .env variable
// const API_URL = 'http://localhost:5000/api/';

// NGROK TUNNELING
const API_URL = 'http://4cc6af626608.ngrok.io' + '/api/';

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
// TODO - finish api call to send updated order status to the server
export async function updateOrderStatus(orderId, readyStatus, pickedUpStatus) {
   const URL = API_URL + 'order/' + orderId;
   return fetch(URL, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         // put stuff here to send updated data to the server
      })
   })
   .then(resp => {
      errorHandling(resp);
      return resp.json();
   })
   .then(jsonData => {
      // console.log(jsonData); // use to check what's being sent to server??
      return jsonData
   })
   .catch(err => catchBlock(err));
}