import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { GlobalContext } from '../context/GlobalState';
import { Styles } from '../styles/OrderDetailsScreen';
import { OrderDetailsHeader, OrderDetailsItems, OrderDetailsContact, OrderDetailsPricing } from '../components/Component-Exports';
import * as dbApi from '../api/orderApi';

const orderStatusFunc = (order) => {
   if (order.pickedUp && order.paid) return 2;
   if (order.ready) return 1;
   if (!order.ready) return 0;
}

const OrderDetailsScreen = (props) => {
   const { state } = useContext(GlobalContext);
   const order = state.selectedOrder;

   const [orderStatus, updateOrderStatus] = useState(orderStatusFunc(order));
   const buttons = ['Not Ready', 'Ready', 'Fulfilled'];
   
   const orderStatusOnPress = async (i) => {
      if (i === orderStatus) return; // if the index press is already selected do nothing
      updateOrderStatus(i);
      const orderId = order._id
      if (i === 0) {
         dbApi.updateOrderStatus(orderId, false, false, false);
      };
      if (i === 1) {
         dbApi.updateOrderStatus(orderId, true, false, false)
      } else if (i === 2) {
         dbApi.updateOrderStatus(orderId, true, true, true)
      }
   }
   return (
      <SafeAreaView style={Styles.container}>
         <ScrollView >
            <OrderDetailsHeader firstName={order.firstName} lastName={order.lastName} paid={order.paid} ready={order.ready} pickedUp={order.pickedUp} orderPlacedDate={order.orderPlacedDate} />
            <OrderDetailsContact phone={order.phone} email={order.email} />
            <OrderDetailsItems items={order.orderItems}/>
            <OrderDetailsPricing subtotal={order.subtotal} tax={order.tax} totalCost={order.totalCost} />

            <ButtonGroup
               buttons={buttons}
               onPress={orderStatusOnPress}
               selectedIndex={orderStatus}
            />
         </ScrollView>
      </SafeAreaView>
   );
}
export default OrderDetailsScreen;