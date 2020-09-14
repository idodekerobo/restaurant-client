import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderScreen, OrderDetailsScreen } from './Screen-Exports';

const Stack = createStackNavigator();

export default class StackNavigator extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      let backgroundColor = {
         backgroundColor: '#fff'
      }
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
}