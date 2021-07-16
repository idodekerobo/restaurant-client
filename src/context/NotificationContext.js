import React, { useContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cloneDeep from 'lodash/cloneDeep';
import { API_URL } from '../api/api';
import { OFFLINE_ORDER_NOTIFICATIONS_KEY } from '../api/offline_keys'

// firebase
import firebase from '../services/firebase'

// push notif imports
import * as Notifications from 'expo-notifications';

const PUSH_TOKEN_ENDPOINT = API_URL + 'saveToken/'

// TODO - need to save order notifications on local storage so it is persistent to the device thru crashes/app closures
const Context = React.createContext({
   orderNotifications: [ ],
})

const reducer = (state, action) => {
   switch (action.type) {
      case 'addNotification':
         return { ...state, orderNotifications: [...state.orderNotifications, action.payload] }
      case 'clearAllNotifications':
         return { ...state, orderNotifications: [ ] }
      case 'updateOrderNotificationArray':
         return { ...state, orderNotifications: action.payload }
      default:
         return state
   }
}

export const Provider = ({ children }) => {
   const [state, dispatch] = useReducer(reducer, {
      orderNotifications: [{}],
   })

   useEffect(() => {
      console.log('notification context firing');
      console.log('state')
      console.log(state.orderNotifications);
      registerForPushNotificationsAsync();

      Notifications.setNotificationHandler({
         handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
         }),
      });

      const subscription = Notifications.addNotificationReceivedListener(async notif => {
         const notifIdentifier = notif.request.identifier;
         const notifDataObject = notif.request.content.data;
         const { _id, firstName, lastName } = notifDataObject;

         console.log(notifIdentifier);

         // check if orderId is truthy
         // if it is falsy there was an error or the notification wasn't an order
         // we don't want to repeat notification if it isn't an order
         if (_id) {

            const scheduledNotifId = await Notifications.scheduleNotificationAsync({
               content: {
               title: `You have an order you haven't started!`,
               subtitle: `Make sure you start ${firstName}'s order!`,
               sound: 'default'
               },
               trigger: {
                  seconds: (60*2), // min 60 seconds for repeating notifications
                 repeats: true, // whether the notif repeats
               },
            });
            console.log('scheduled notif id')
            console.log(scheduledNotifId);
            const notifObject = {
               notifId: scheduledNotifId,
               orderId: _id,
               started: false,
               firstName,
               lastName
            }
            addOrderNotification(notifObject);
         }
      });

      return () => subscription.remove();
   }, [])

   // this should be done after sign in since it'll be associated w/ the restaurant that signed in
   const registerForPushNotificationsAsync = async () => {
      const notificationRequest = await Notifications.requestPermissionsAsync({
         ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
         },
      });
      if (notificationRequest.status !== 'granted') {
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

   const getCurrentLocalOrderNotifications = async () => {
      try {
         const currentJsonOrderNotifArr = await AsyncStorage.getItem(OFFLINE_ORDER_NOTIFICATIONS_KEY);
         if (currentJsonOrderNotifArr != null) {
            const currentOrderNotifArr = JSON.parse(currentJsonOrderNotifArr);
            return currentOrderNotifArr;
         } else {
            return [ ];
         }
      } catch (err) {
         console.log(err);
         console.log(err.message);
         console.log(err.response)
      }
   }

   const setCurrentLocalOrderNotifications = async (notificationArray) => {
      const jsonNotificationArray = JSON.stringify(notificationArray)
      await AsyncStorage.setItem(OFFLINE_ORDER_NOTIFICATIONS_KEY, jsonNotificationArray);
   }

   const addOrderNotification = async (newNotif) => {
      dispatch({type: 'addNotification', payload: newNotif })
      
      try {
         const currentOrderNotifArr = await getCurrentLocalOrderNotifications();
         const newOrderNotificationArr = [...currentOrderNotifArr, newNotif]

         const jsonNewOrderNotificationArr = JSON.stringify(newOrderNotificationArr);
         await AsyncStorage.setItem(OFFLINE_ORDER_NOTIFICATIONS_KEY, jsonNewOrderNotificationArr)
      } catch (err) {
         console.log(err);
         console.log(err.message);
         console.log(err.response)
      }
   }

   const stopNotificationsForOrder = async (lookupOrderId) => {

      const currentOrderNotifArr = await getCurrentLocalOrderNotifications();
      // const notificationObject = state.orderNotifications.find(obj => obj.orderId === lookupOrderId);
      const notificationObject = currentOrderNotifArr.find(obj => obj.orderId === lookupOrderId);
      const notificationId = notificationObject.notifId;

      Notifications.cancelScheduledNotificationAsync(notificationId);

      // let notifArrayCopy = cloneDeep(state.orderNotifications);
      let notifArrayCopy = cloneDeep(currentOrderNotifArr);
      const findNotifIndex = notifArrayCopy.findIndex(obj => obj.notifId === notificationId)
      notifArrayCopy[findNotifIndex].started = true;

      console.log(notifArrayCopy);

      setCurrentLocalOrderNotifications(notifArrayCopy)
      dispatch({ type: 'updateOrderNotificationArray', payload: notifArrayCopy });
   }

   const removeAllNotifications = async () => {
      dispatch({type: clearAllNotifications});
      await AsyncStorage.removeItem(OFFLINE_ORDER_NOTIFICATIONS_KEY);
   }

   return <Context.Provider value={{ ...state, stopNotificationsForOrder, removeAllNotifications }}>
      {children}
   </Context.Provider>
}

const useNotificationContext = () => useContext(Context);
export { Context, useNotificationContext };