import React from 'react';
import { SafeAreaView } from 'react-native';
import OrderQueue from '../containers/OrderQueue';
import { Styles } from '../styles/OrderQueue';

export default OrderScreen = (props) => {
   return (
      <SafeAreaView style={{ ...Styles.container }}>
         <OrderQueue navigate={props.navigation.navigate}/>
      </SafeAreaView>
   )
}