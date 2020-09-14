import React, { useState, useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { GlobalContext } from '../context/GlobalState';
import { Styles } from '../styles/OrderDetailsScreen';
import { OrderDetailsHeader, OrderDetailsItems, OrderDetailsContact, OrderDetailsPricing } from '../components/Component-Exports';


const OrderDetailsScreen = (props) => {
   const { state } = useContext(GlobalContext);
   const order = state.selectedOrder;

   // default should be order status
   const [orderStatus, updateOrderStatus] = useState(0);
   const buttons = ['Not Ready', 'Ready', 'Fulfilled'];
   
   const orderStatusOnPress = (i) => {
      updateOrderStatus(i);
      // TODO - make API call to send updated order status to the server
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