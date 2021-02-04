import React from 'react';
// import { Dimensions } from 'react-native';
import StackNavigator from './screens/StackNavigator';
import { getAllOrders } from './api/api';
import { GlobalContext } from './context/GlobalState';
import {FETCH_ORDERS} from './context/ActionCreators';

export default class Dash extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         // to manage orientation flip from portrait to landscape
         // width: Dimensions.get('window').width,
         // height: Dimensions.get('window').height,
      }

      // to manage orientation flip from portrait to landscape
      // Dimensions.addEventListener("change", e => {
      //    this.setState(e.window);
      // })
   }
   static contextType = GlobalContext;
   
   grabOrdersFromDb = async () => {
      const orderArr = await getAllOrders();
      const { dispatch } = this.context;
      dispatch({ type: FETCH_ORDERS, orderArr});
   }

   componentDidMount() {
      this.grabOrdersFromDb();
   }

   render() {
      return (
         <StackNavigator/>
      );
   }
}