import React from 'react';
import Dash from './Dash';
import { GlobalProvider } from './context/GlobalState';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

// export default function App() {
export default class App extends React.Component {
   
   getNotificationsPermission = async () => {
      const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status === 'granted') {

      } else {

      }
   }
   render() {
      return (
         <GlobalProvider>
            <Dash />
         </GlobalProvider>
      );
   }
}