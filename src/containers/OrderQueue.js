import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Order from '../components/Order';
import { Styles } from '../styles/OrderQueue';
import * as dbApi from '../api/orderApi';

export default OrderQueue = (props) => {
   const [orderState, setOrders] = useState([{ }]);

   const grabOrdersFromDb = async () => {
      const ordersFromDB = await dbApi.getAllOrders();
      setOrders(ordersFromDB);
      // console.log(ordersFromDB);
      // console.log(ordersFromDB.orderItems);
   }

   useEffect( () => {
      grabOrdersFromDb();
   }, []);

   const currentOrders = orderState.map((obj, i) => (
      <View key={i} style={Styles.orderContainer}>
         <Order data={obj}/>
      </View>
   ));

   return (
      <View style={Styles.wrapperContainer}>
         {currentOrders}
      </View>
   );
}