import React, { useEffect, useContext } from 'react';
import { View, Text,  SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Order from '../components/Order';
import { Styles } from '../styles/OrderQueue';
import { GlobalContext } from '../context/GlobalState';

export default OrderQueue = (props) => {
   const { state } = useContext(GlobalContext);

   useEffect(() => {
   }, []);

   onPress = () => {
      props.navigation.navigate('OrderDetails');
   }

   // TODO - implement stack or algo to sort from newest to oldest
   const currentOrders = state.orders.map((obj, i) => (
      <TouchableOpacity onPress={onPress} key={i} style={Styles.orderContainer}>
         <Order key={i} data={obj} />
      </TouchableOpacity>
   ));

   return (
      <SafeAreaView style={{ ...Styles.container }}>
         <ScrollView style={Styles.wrapperContainer} contentContainerStyle={Styles.scrollViewContent}>
            {currentOrders}
         </ScrollView>
      </SafeAreaView>
   );
}