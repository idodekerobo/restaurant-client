import React, { useState, useEffect } from 'react';
import { View, Text,  SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Order from '../components/Order';
import { Styles } from '../styles/OrderQueue';
import * as dbApi from '../api/orderApi';

export default OrderQueue = (props) => {
   const [orderState, setOrders] = useState([{}]);

   const grabOrdersFromDb = async () => {
      const ordersFromDB = await dbApi.getAllOrders();
      setOrders(ordersFromDB);
   }

   useEffect(() => {
      grabOrdersFromDb();
   }, []);

   onPress = () => {
      props.navigation.navigate('OrderDetails');
   }

   // TODO - implement stack or algo to sort from newest to oldest
   const currentOrders = orderState.map((obj, i) => (
      <TouchableOpacity onPress={onPress} key={i} style={Styles.orderContainer}>
         <Order key={i} data={obj} />
      </TouchableOpacity>
   ));

   return (
      <SafeAreaView style={{ ...Styles.container }}>
         <ScrollView style={Styles.wrapperContainer} contentContainerStyle={Styles.scrollViewContent}>
            {currentOrders}
         </ScrollView>
      </SafeAreaView>
   );
}