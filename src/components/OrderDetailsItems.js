import React from 'react';
import { View, Text } from 'react-native';
import { Styles } from '../styles/OrderDetailsItems';

export default OrderDetails = ({items}) => {
   const itemList = items.slice().map( (item, i) => (
      <Text key={item._id} style={Styles.orderItem}>{item.name}: ${item.price.toFixed(2)}</Text>
   ))
   return (
      <View style={Styles.orderDetailsContainer}>
         <Text style={Styles.itemHeader}>Items:</Text>
         {itemList}
      </View>
   );
}