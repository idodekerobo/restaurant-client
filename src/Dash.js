import React from 'react';
import { Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderQueue from './containers/OrderQueue'
import OrderDetails from './screens/OrderDetails';
import * as dbApi from './api/orderApi';

import { GlobalContext } from './context/GlobalState';
import {FETCH_ORDERS} from './context/ActionCreators';


const Stack = createStackNavigator();

export default class Dash extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         // to manage orientation flip from portrait to landscape
         width: Dimensions.get('window').width,
         height: Dimensions.get('window').height,
      }

      // to manage orientation flip from portrait to landscape
      Dimensions.addEventListener("change", e => {
         this.setState(e.window);
      })
   }
   static contextType = GlobalContext;
   
   grabOrdersFromDb = async () => {
      const orderArr = await dbApi.getAllOrders();
      const { dispatch } = this.context;
      dispatch({ type: FETCH_ORDERS, orderArr});
   }

   componentDidMount() {
      this.grabOrdersFromDb();
   }

   render() {
      return (
         <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen name="Orders" component={OrderQueue} />
               <Stack.Screen name="OrderDetails" component={OrderDetails} />
            </Stack.Navigator>
         </NavigationContainer>
      );
   }

}