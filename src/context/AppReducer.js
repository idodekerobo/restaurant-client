import { FETCH_ORDERS, SELECT_ORDER } from './ActionCreators';
export const Reducer = (state, action) => {
   switch (action.type) {
      case FETCH_ORDERS: 
         return {
            ...state,
            orders: action.orderArr
         };
      case SELECT_ORDER:
         return {
            ...state,
            selectedOrder: action.order
         }
      default: 
         return state;
   }
}