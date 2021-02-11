import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen, SignUpScreen } from '../screens/Screen-Exports';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {

   return (
      <NavigationContainer>
         <Stack.Navigator>
            <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Sign Up" component={SignUpScreen} />
         </Stack.Navigator>
      </NavigationContainer>
   );
}
export default AuthStackNavigator;