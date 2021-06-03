import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { Order } from '../components/Component-Exports';
import { Styles } from '../styles/OrderQueue';
import { GlobalContext } from '../context/GlobalState';
import { FETCH_ORDERS, SELECT_ORDER } from '../context/ActionCreators';
import { wait, getAllOrders, BASE_API_URL } from '../api/api';
// socket io for real time orders
import { io } from "socket.io-client";

export default OrderQueue = (props) => {
   const { state, dispatch } = useContext(GlobalContext);
   const [refreshing, setRefreshing] = useState(false);

   // const [ orders, setOrders ] = useState(state.orders)
   
   onPress = (id) => {
      const order = state.orders.slice().find( (order) => order._id === id);
      dispatch({type: SELECT_ORDER, order});
      props.navigate('Order Details');
   }

   const grabOrdersFromDb = async () => {
      const orderArr = await getAllOrders();
      dispatch({ type: FETCH_ORDERS, orderArr});
   }

   const onRefresh = () => {
      grabOrdersFromDb();
      setRefreshing(true);
      wait(2000).then( () => setRefreshing(false));
   }

   // TODO - implement stack or algo to sort from newest to oldest
   let currentOrders;
   if (!state.orders || state.orders.length === 0) {
      currentOrders = <View style={{flex: 1, width: '100%', height: 100, justifyContent: 'center', alignItems: 'center'}}>
         <Text style={{fontSize: 28}}>No orders yet!</Text>
      </View>
   } else {
      currentOrders = state.orders.slice().reverse().map((obj, i) => (
         <TouchableOpacity key={(obj._id) ? obj._id : i} onPress={onPress.bind(this, obj._id)} style={Styles.orderContainer}>
            <Order data={obj} />
         </TouchableOpacity>
      ));
   }

   useEffect(() => {
      const socket = io(BASE_API_URL)
      socket.on('order-change', newOrder => {
         // const newOrderArr = [...state.orders, newOrder]
         // dispatch({ type: FETCH_ORDERS, newOrderArr});
         
         // TODO - can't figure out how to get context to properly update
            // so just triggering a refresh when a new order comes in
         console.log('triggering order-change emit from server');
         onRefresh();
      })
      return () => {
         // before the component is destroyed
         // unbind all event handlers used in this component
         socket.off('order-change');
       };
   }, [ ])
   return (
         <ScrollView
            style={Styles.wrapperContainer}
            contentContainerStyle={Styles.scrollViewContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         >
            {currentOrders}
         </ScrollView>
   );
}