import { FETCH_ORDERS } from './ActionCreators';
export const Reducer = (state, action) => {
   switch (action.type) {
      case FETCH_ORDERS: 
         return {

         };
      default: 
         return state;
   }
}