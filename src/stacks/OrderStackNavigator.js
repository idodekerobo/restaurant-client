import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderScreen, OrderDetailsScreen } from '../screens/Screen-Exports';

const Stack = createStackNavigator();

const OrderStackNavigator = () => {

   let backgroundColor = {
      backgroundColor: '#fff'
   }

   return (
         <Stack.Navigator>
            <Stack.Screen name="Orders" component={OrderScreen} />
            <Stack.Screen name="Order Details" component={OrderDetailsScreen} 
               options={{cardStyle: backgroundColor}}
            />
         </Stack.Navigator>
   )
}
export default OrderStackNavigator;