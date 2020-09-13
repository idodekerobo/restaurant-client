import React from 'react';
import Dash from './Dash';
import { GlobalProvider } from './context/GlobalState';

// export default function App() {
export default class App extends React.Component {
   render() {
      return (
         <GlobalProvider>
            <Dash />
         </GlobalProvider>
      );
   }
}