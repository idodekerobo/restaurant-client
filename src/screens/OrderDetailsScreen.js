import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { GlobalContext } from '../context/GlobalState';
import { Styles } from '../styles/OrderDetailsScreen';
import { OrderDetailsHeader, OrderDetailsItems, OrderDetailsContact, OrderDetailsPricing } from '../components/Component-Exports';
import * as dbApi from '../api/api';
import { FETCH_ORDERS, SELECT_ORDER } from '../context/ActionCreators';

const orderStatusFunc = (order) => {
   if (order.pickedUp && order.paid) return 2;
   if (order.ready) return 1;
   if (!order.ready) return 0;
}
const wait = (timeout) => {
   return new Promise(resolve => {
     setTimeout(resolve, timeout);
   });
 }

const OrderDetailsScreen = (props) => {
   const { state, dispatch } = useContext(GlobalContext);
   // let order = state.selectedOrder;
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
      
      wait(2000).then( () => setRefreshing(false));
   }

   const [orderStatus, updateOrderStatus] = useState(orderStatusFunc(order));
   const buttons = ['Not Ready', 'Ready', 'Picked Up'];
   
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
      onRefresh();
   }
   
   return (
      <SafeAreaView style={[Styles.container]}>
         <ScrollView style={Styles.scrollViewContainer} contentContainerStyle={Styles.scrollViewContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
            <OrderDetailsHeader firstName={order.firstName} lastName={order.lastName} paid={order.paid} ready={order.ready} pickedUp={order.pickedUp} orderPlacedDate={order.orderPlacedDate} />
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