import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignInScreen, SignUpScreen } from '../screens/Screen-Exports';
import { GlobalContext } from '../context/GlobalState';
import { getAllOrders } from '../api/api';
import { FETCH_ORDERS } from '../context/ActionCreators';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
   const { state, dispatch } = useContext(GlobalContext)

   const grabOrdersFromDb = async () => {
      const orderArr = await getAllOrders();
      dispatch({ type: FETCH_ORDERS, orderArr});
   }

   useEffect( () => {
      grabOrdersFromDb();
   }, [state.orders])

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