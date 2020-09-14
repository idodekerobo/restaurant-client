import React from 'react';
import { View, Text } from 'react-native'
import { Styles } from '../styles/OrderDetailsPricing';

const OrderDetailsPricing = ({subtotal, tax, totalCost}) => {
   return (
      <View style={Styles.container}>
         <Text style={Styles.totalCost}>Total: ${totalCost.toFixed(2)}</Text>
         <Text style={Styles.subtotal}>Subtotal: ${subtotal.toFixed(2)}</Text>
         <Text style={Styles.tax}>Tax: ${tax.toFixed(2)}</Text>
      </View>
   );
}
export default OrderDetailsPricing;