import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Order from '../components/Order';
import { Styles } from '../styles/OrderQueue';
import * as dbApi from '../api/orderApi';

export default OrderQueue = (props) => {
   // const orders = [
   //    {
   //       name: 'order1'
   //    },
   //    {
   //       name: 'order2'
   //    },
   //    {
   //       name: 'order3'
   //    },
   // ];
   const [orderState, setOrders] = useState([{ }]);

   const grabOrdersFromDb = async () => {
      const ordersFromDB = await dbApi.getAllOrders();
      setOrders(ordersFromDB);
      return ordersFromDB;
   }
   // const order = grabOrdersFromDb;

   useEffect( () => {
      grabOrdersFromDb();
   }, []);

   const currentOrders = orderState.map((obj, i) => (
      <View key={i} style={Styles.orderContainer}>
         {/* <Order {obj}/> */}
         <Order name={obj.name} email={obj.email}/>
      </View>
   ));

   return (
      <View style={Styles.wrapperContainer}>
         {currentOrders}
      </View>
   );
}