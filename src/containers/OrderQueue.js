import React, { useState, useContext } from 'react';
import { ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Order } from '../components/Component-Exports';
import { Styles } from '../styles/OrderQueue';
import { GlobalContext } from '../context/GlobalState';
import { FETCH_ORDERS, SELECT_ORDER } from '../context/ActionCreators';
import { wait, getAllOrders } from '../api/api';

export default OrderQueue = (props) => {
   const { state, dispatch } = useContext(GlobalContext);
   const [refreshing, setRefreshing] = useState(false);
   
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
   if (!state.orders) {
      currentOrders = null;
   } else {
      currentOrders = state.orders.slice().reverse().map((obj, i) => (
         <TouchableOpacity key={(obj._id) ? obj._id : i} onPress={onPress.bind(this, obj._id)} style={Styles.orderContainer}>
            <Order data={obj} />
         </TouchableOpacity>
      ));
   }
   return (
         <ScrollView
            style={Styles.wrapperContainer}
            contentContainerStyle={Styles.scrollViewContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
         >
            {currentOrders}
            {currentOrders}
         </ScrollView>
   );
}