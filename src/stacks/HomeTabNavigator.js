import React, { useContext, useEffect } from 'react';
// react navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// component imports
import { ProfileScreen } from '../screens/Screen-Exports';
import OrderStackNavigator from './OrderStackNavigator';
import MenuStackNavigator from './MenuStackNavigator';

// api imports
import { API_URL, getAllOrders } from '../api/api';

// Firebase import
import firebase from '../services/firebase';

// global state imports
import { GlobalContext } from '../context/GlobalState';
import { FETCH_ORDERS } from '../context/ActionCreators';

// push notif imports
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'
import { State } from 'react-native-gesture-handler';

const PUSH_TOKEN_ENDPOINT = API_URL + 'saveToken/'

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
   const { dispatch } = useContext(GlobalContext);

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

   // this should be done at sign in since it'll be associated w/ the restaurant that signed in
   const registerForPushNotificationsAsync = async () => {
      // if (Constants.isDevice) {
      // } else {
      //    alert('must use phsyical device for push notifs');
      // }
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
         alert('You need to allow notifications so you can be alerted when new orders come in!')
         return;
      } else {
      }
      // TODO - make this check if the same token is already present in async storage. if yes, short circuit the function
      const token = await Notifications.getExpoPushTokenAsync();

      // sending push token of device to the server to make sure that the user is notified when orders come in to the server
      // using onAuthStateChanged to make sure it waits until firebase is initialized
      firebase.auth().onAuthStateChanged(async user => {
         if (user) {
            try {
               const response = await fetch(PUSH_TOKEN_ENDPOINT, {
                  method: 'POST',
                  headers: {
                     Accept: 'application/json',
                     'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                     clientToken: {
                        value: token,
                     },
                     uuid: user.uid,
                  }),
               });
               const serverResponse = await response.text();
               console.log(serverResponse);
            } catch (e) {
               console.log(`the try/catch block for the fetch push token endpoint isn't working`);
               console.log(`error.code ${e.code}`)
               console.log(`error msg ${e.message}`);
               console.log(`full error ${e}`)
            }
         } else {
            console.log(`auth is not initialized yet or user is not signed in`);
         }
      });
   }

   useEffect( () => {
      registerForPushNotificationsAsync();
      // grabOrdersFromDb();
   },[ ])

   return (
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
   );
}
export default HomeTabNavigator;