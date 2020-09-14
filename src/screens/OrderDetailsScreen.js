import React, { useContext } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { GlobalContext } from '../context/GlobalState';
import { Styles } from '../styles/OrderDetailsScreen';
import { OrderDetailsHeader, OrderDetailsItems, OrderDetailsContact, OrderDetailsPricing } from '../components/Component-Exports';


const OrderDetailsScreen = (props) => {
   const { state } = useContext(GlobalContext);
   const order = state.selectedOrder;

   const buttons = ['Not Ready', 'Ready', 'Fulfilled'];
   
   const orderStatusOnPress = () => {
      console.log('pressed order status button group');
   }
   return (
      <SafeAreaView style={Styles.container}>
         <ScrollView >
            <OrderDetailsHeader firstName={order.firstName} lastName={order.lastName} paid={order.paid} completed={order.completed} orderPlacedDate={order.orderPlacedDate} />
            <OrderDetailsContact phone={order.phone} email={order.email} />
            <OrderDetailsItems items={order.orderItems}/>
            <OrderDetailsPricing subtotal={order.subtotal} tax={order.tax} totalCost={order.totalCost} />

            <ButtonGroup
               buttons={buttons}
               onPress={orderStatusOnPress}
               selectedIndex={0}
            />
         </ScrollView>
      </SafeAreaView>
   );
}
export default OrderDetailsScreen;