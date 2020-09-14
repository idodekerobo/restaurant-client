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