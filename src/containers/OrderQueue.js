import React, { useEffect, useContext } from 'react';
import { View, Text,  SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Order } from '../components/Component-Exports';
import { Styles } from '../styles/OrderQueue';
import { GlobalContext } from '../context/GlobalState';
import { SELECT_ORDER } from '../context/ActionCreators';

export default OrderQueue = (props) => {
   const { state, dispatch } = useContext(GlobalContext);

   useEffect(() => {
   }, []);

   onPress = (id) => {
      const order = state.orders.slice().find( (order) => order._id === id);
      dispatch({type: SELECT_ORDER, order});
      props.navigate('Order Details');
   }

   // TODO - implement stack or algo to sort from newest to oldest
   let currentOrders;
   if (!state.orders) {
      currentOrders = null;
   } else {
      currentOrders = state.orders.map((obj, i) => (
         <TouchableOpacity key={(obj._id) ? obj._id : i} onPress={onPress.bind(this, obj._id)} style={Styles.orderContainer}>
            <Order data={obj} />
         </TouchableOpacity>
      ));
   }
   return (
         <ScrollView style={Styles.wrapperContainer} contentContainerStyle={Styles.scrollViewContent}>
            {currentOrders}
         </ScrollView>
   );
}