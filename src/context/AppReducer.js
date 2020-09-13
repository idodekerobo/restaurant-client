import { FETCH_ORDERS } from './ActionCreators';
export const Reducer = (state, action) => {
   switch (action.type) {
      case FETCH_ORDERS: 
         return {
            ...state,
            orders: action.orderArr
         };
      default: 
         return state;
   }
}