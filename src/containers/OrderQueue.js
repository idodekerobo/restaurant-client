import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Order from '../components/Order';
import { Styles } from '../styles/OrderQueue';
import * as dbApi from '../api/orderApi';

export default OrderQueue = (props) => {
   const [orderState, setOrders] = useState([{ }]);

   const grabOrdersFromDb = async () => {
      const ordersFromDB = await dbApi.getAllOrders();
      setOrders(ordersFromDB);
   }

   useEffect( () => {
      grabOrdersFromDb();
   }, []);

   // TODO - implement stack or algo to sort from newest to oldest
   const currentOrders = orderState.map((obj, i) => (
      <View key={i} style={Styles.orderContainer}>
         <Order key={i} data={obj}/>
      </View>
   ));

   return (
      <ScrollView style={Styles.wrapperContainer} contentContainerStyle={Styles.scrollViewContent}>
         {currentOrders}
      </ScrollView>
   );
}