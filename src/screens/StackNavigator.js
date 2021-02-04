import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { OrderScreen, OrderDetailsScreen, SignInScreen } from './Screen-Exports';

const Stack = createStackNavigator();

export default class StackNavigator extends React.Component {
   constructor(props) {
      super(props); // deprecated???
   }

   render() {
      let backgroundColor = {
         backgroundColor: '#fff'
      }
      return (
         <NavigationContainer>
            <Stack.Navigator>
               <Stack.Screen name="Sign In" component={SignInScreen} />
               <Stack.Screen name="Orders" component={OrderScreen} />
               <Stack.Screen name="Order Details" component={OrderDetailsScreen} 
                  options={{cardStyle: backgroundColor}}
               />
            </Stack.Navigator>
         </NavigationContainer>
      );
   }
}