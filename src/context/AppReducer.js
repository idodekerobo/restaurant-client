import { FETCH_ORDERS, SELECT_ORDER } from './ActionCreators';
export const Reducer = (state, action) => {
   switch (action.type) {
      case FETCH_ORDERS: 
         console.log('fired fetch orders action in app reducer');
         return {
            ...state,
            orders: action.orderArr
         };
      case SELECT_ORDER:
         console.log('fired select order action in app reducer');
         return {
            ...state,
            selectedOrder: action.order
         }
      default: 
         return state;
   }
}