import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderScreen, OrderDetailsScreen } from '../screens/Screen-Exports';
import { getAllOrders } from '../api/api';
import { GlobalContext } from '../context/GlobalState';
import { FETCH_ORDERS } from '../context/ActionCreators';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
   const { state, dispatch } = useContext(GlobalContext);
   let backgroundColor = {
      backgroundColor: '#fff'
   }

   const grabOrdersFromDb = async () => {
      const orderArr = await getAllOrders();
      dispatch({ type: FETCH_ORDERS, orderArr});
   }

   useEffect( () => {
      grabOrdersFromDb();
   },[state.orders])

   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="Orders" component={OrderScreen} />
            <Stack.Screen name="Order Details" component={OrderDetailsScreen} 
               options={{cardStyle: backgroundColor}}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
export default HomeStackNavigator;