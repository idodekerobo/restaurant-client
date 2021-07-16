// react
import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

// custom components
import { OrderDetailsHeader, OrderDetailsItems, OrderDetailsContact, OrderDetailsPricing } from '../components/Component-Exports';

// context/api's
import { FETCH_ORDERS } from '../context/ActionCreators';
import { GlobalContext } from '../context/GlobalState';
import { useNotificationContext } from '../context/NotificationContext';
import * as dbApi from '../api/api';

// styles
import { Styles } from '../styles/OrderDetailsScreen';

const orderStatusFunc = (order) => {
   if (order.pickedUp && order.paid) return 2;
   if (order.ready) return 1;
   if (order.entered) return 0;
   if (!order.entered) return null;
}
const wait = (timeout) => {
   return new Promise(resolve => {
     setTimeout(resolve, timeout);
   });
}

const OrderDetailsScreen = (props) => {
   const { state, dispatch } = useContext(GlobalContext);
   const { stopNotificationsForOrder } = useNotificationContext();

   const [order, updateOrder] = useState(state.selectedOrder)
   const [refreshing, setRefreshing] = useState(false);
   
   const onRefresh = async () => {
      setRefreshing(true);
      const currentlySelectedId = order._id;
      // 1. grab orders from database and push to universal state
      const orderArr = await dbApi.getAllOrders();
      dispatch({type: FETCH_ORDERS, orderArr})
      
      // 2. grab the specific order you wanted to update 
      const updatedOrder = orderArr.slice().find( (order) => order._id === currentlySelectedId);

      // 3. grab the neeeded order using selectedId n update the currently rendered order
      updateOrder(updatedOrder);
      // console.log(order.orderItems);
      
      wait(3000).then( () => setRefreshing(false));
   }

   const [orderStatus, updateOrderStatus] = useState(orderStatusFunc(order));
   const buttons = ['Entered', 'Ready', 'Picked Up'];
   
   const orderStatusOnPress = async (i) => {
      if (i === orderStatus) return; // if the index press is already selected do nothing
      updateOrderStatus(i);
      const orderId = order._id
      if (i === 0) {
         // order of params go _id, enteredStatus, readyStatus, paidStatus, pickedUpStatus
         dbApi.updateOrderStatus(orderId, true, false, false, false);
         stopNotificationsForOrder(orderId); // stopping notifs when order is started
      };
      if (i === 1) {
         dbApi.updateOrderStatus(orderId, true, true, false, false)
      } else if (i === 2) {
         dbApi.updateOrderStatus(orderId, true, true, true, true)
      }
      onRefresh();
   }

   useEffect(() => {

   }, [ ])
   
   return (
      <SafeAreaView style={[Styles.container]}>
         <ScrollView style={Styles.scrollViewContainer} contentContainerStyle={Styles.scrollViewContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            <OrderDetailsHeader firstName={order.firstName} lastName={order.lastName} paid={order.paid} ready={order.ready} pickedUp={order.pickedUp} entered={order.entered} orderPlacedDate={order.orderPlacedDate} />
            <OrderDetailsContact phone={order.phone} email={order.email} />
            <OrderDetailsItems items={order.orderItems}/>
            <OrderDetailsPricing subtotal={order.subtotal} tax={order.tax} totalCost={order.totalCost} />

            <ButtonGroup
               buttons={buttons}
               onPress={orderStatusOnPress}
               selectedIndex={orderStatus}
               containerStyle={Styles.buttonGroupContainer}
               textStyle={Styles.buttonGroupTextStyle}
               buttonStyle={Styles.buttonGroupStyle}
               selectedButtonStyle={Styles.selectedButtonStyle}
               innerBorderStyle={{width: 3}}
            />
         </ScrollView>
      </SafeAreaView>
   );
}
export default OrderDetailsScreen;