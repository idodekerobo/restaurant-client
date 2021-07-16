import React, { useContext, useEffect } from 'react';
// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// component imports
import { ProfileScreen } from '../screens/Screen-Exports';
import OrderStackNavigator from './OrderStackNavigator';
import MenuStackNavigator from './MenuStackNavigator';

// api imports
import { getAllOrders } from '../api/api';

// Firebase import
import firebase from '../services/firebase';

// context imports
import { GlobalContext } from '../context/GlobalState';
import { FETCH_ORDERS } from '../context/ActionCreators';
import { Provider as NotificationProvider } from '../context/NotificationContext';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
   const { state, dispatch } = useContext(GlobalContext);

   const grabOrdersFromDb = async () => {
      firebase.auth().onAuthStateChanged(async user => {
         if (user) {
            const idToken = await user.getIdToken()
            if (idToken.authStatus == 'not authorized') return;
            const orderArr = await getAllOrders(idToken);
            dispatch({ type: FETCH_ORDERS, orderArr});
         }
      });
   }

   useEffect( () => {
      grabOrdersFromDb();
   },[ state.orders ])

   return (
      <NotificationProvider>
         <NavigationContainer>
            <Tab.Navigator
               tabBarOptions={{
                  activeTintColor: 'black',
                  labelStyle: {
                     fontSize: 20
                  }
               }}
            >
               <Tab.Screen name="Orders" component={OrderStackNavigator} />
               <Tab.Screen name="Menu" component={MenuStackNavigator} />
               <Tab.Screen name="Account" component={ProfileScreen} />
            </Tab.Navigator>
         </NavigationContainer>
      </NotificationProvider>
   );
}
export default HomeTabNavigator;