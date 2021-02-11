import React from 'react';
import Dash from './Dash';
import { GlobalProvider } from './context/GlobalState';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'

// export default function App() {
export default class App extends React.Component {
   
   // getNotificationsPermission = async () => {
   //    const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
   //    if (status === 'granted') {

   //    } else {

   //    }
   // }

   // registerForPushNotificationsAsync = async () => {
   //    if (Constants.isDevice) {

   //    } else {
   //       alert('must use phsyical device for push notifs');
   //    }
   // }
   render() {
      return (
         <GlobalProvider>
            <Dash />
         </GlobalProvider>
      );
   }
}