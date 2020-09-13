import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderScreen, OrderDetails } from './Screen-Exports';

const Stack = createStackNavigator();

export default class StackNavigator extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen name="Orders" component={OrderScreen} />
               <Stack.Screen name="OrderDetails" component={OrderDetails} />
            </Stack.Navigator>
         </NavigationContainer>
      );
   }
}