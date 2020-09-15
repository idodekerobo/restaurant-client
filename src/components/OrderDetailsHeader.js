import React from 'react';
import { View, Text } from 'react-native';
import { Styles } from '../styles/OrderDetailsHeader';

const OrderDetailsHeader = ({firstName, paid, ready, pickedUp, orderPlacedDate}) => {
   const orderTime = (orderPlacedDate) ? new Date(orderPlacedDate) : '';
   pickedUpOrder = {
      backgroundColor: '#3f51b5' // indigo
   }
   openOrder = {
      backgroundColor: '#4caf50' // green
   }
   return (
      <View style={[Styles.container, (pickedUp) ? pickedUpOrder : openOrder]}>
         <Text style={[Styles.orderName, Styles.fontColor]}>{firstName + "'s Order"}</Text>
         <Text style={[Styles.orderDate, Styles.fontColor]}>{orderTime.toLocaleTimeString() + ", " + orderTime.toLocaleDateString()}</Text>
         <View style={Styles.flagContainer}>
            <Text style={[Styles.paidFlag, Styles.fontColor]}>{(paid) ? "Paid" : "Not Paid"}</Text>
            <Text style={[Styles.completedFlag, Styles.fontColor]}>{(ready) ? "Ready" : "Not Ready"}</Text>
            <Text style={[Styles.completedFlag, Styles.fontColor]}>{(pickedUp) ? "Picked Up" : "Not Picked Up"}</Text>
         </View>
      </View>
   );
}
export default OrderDetailsHeader;