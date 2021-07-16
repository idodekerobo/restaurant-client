import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width; // 390 for my iphone 12 pro
// const screenHeight = Dimensions.get('window').height; // 844 for my iphone 12 pro

const OrderDetailsPricing = ({subtotal, tax, totalCost}) => {
   return (
      <View style={Styles.container}>
         <Text style={[Styles.pricing, Styles.subtotal]}>Subtotal: ${subtotal.toFixed(2)}</Text>
         <Text style={[Styles.pricing, Styles.tax]}>Tax: ${tax.toFixed(2)}</Text>
         <Text style={[Styles.pricing, Styles.totalCost]}>Total: ${totalCost.toFixed(2)}</Text>
      </View>
   );
}
export default OrderDetailsPricing;

export const Styles = StyleSheet.create({
   container: {
      //size/layout
      flex: 3,
      maxHeight: '15%',
      marginTop: 20,
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

      //background/color
      backgroundColor: '#fafafc',
      

      // shadow
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
   },
   pricing: {
      // fontSize: 30,
      fontSize: (screenWidth < 420) ? 18 : 30,
   },
   subtotal: {
      paddingBottom: 2,
   },
   tax: {
      paddingBottom: 5,
   },
   totalCost: {
      fontSize: (screenWidth < 420) ? 28 : 40,
      fontWeight: 'bold',
   },
});