import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Styles } from './styles/Dash'
import OrderQueue from './containers/OrderQueue'

export default class Dash extends React.Component {
   constructor(props) {
      super(props);
   }

   render() {
      return (
         <SafeAreaView style={Styles.container}>
            <Text>This is where you can view incoming orders for Dash!</Text>
            <OrderQueue/>
         </SafeAreaView>
      );
   }

}