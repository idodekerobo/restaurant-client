import { FETCH_ORDERS, SELECT_ORDER, SIGN_IN_USER, SIGN_OUT_USER } from './ActionCreators';
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
      case SIGN_IN_USER: 
         return {
            ...state,
            // sign in user
            userSignedIn: action.userSignedIn,
            userUid: action.userUid
         }
      case SIGN_OUT_USER:
         // clean the state
         return {
            orders: [{}],
            selectedOrder: {},
            userSignedIn: false,
            userUid: '',
         }
      default: 
         return state;
   }
}