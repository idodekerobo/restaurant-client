import React from 'react';
import { View, Text,  SafeAreaView } from 'react-native';
import OrderQueue from '../containers/OrderQueue';
import { Styles } from '../styles/OrderQueue';

export default OrderScreen = (props) => {
   
   onPress = (id) => {
      const order = state.orders.slice().find( (order) => order._id === id);
      // console.log(order);
      dispatch({type: SELECT_ORDER, order});
      props.navigation.navigate('OrderDetails');
   }

   return (
      <SafeAreaView style={{ ...Styles.container }}>
         <OrderQueue navigate={props.navigation.navigate}/>
      </SafeAreaView>
   )
}