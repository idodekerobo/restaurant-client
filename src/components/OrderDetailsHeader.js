import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width; // 390 for my iphone 12 pro
// const screenHeight = Dimensions.get('window').height; // 844 for my iphone 12 pro

const OrderDetailsHeader = ({firstName, paid, ready, pickedUp, orderPlacedDate}) => {
   const orderTime = (orderPlacedDate) ? new Date(orderPlacedDate) : '';
   pickedUpOrder = {
      // backgroundColor: '#3f51b5' // indigo
   }
   openOrder = {
      // backgroundColor: '#4caf50' // green
   }
   useEffect(() => {
   }, [ ])
   return (
      <View style={[Styles.container, (pickedUp) ? pickedUpOrder : openOrder]}>
         <View style={Styles.nameAndDateContainer}>
            <Text style={[Styles.orderName, Styles.fontColor]}>{firstName + "'s Order"}</Text>
            <Text style={[Styles.orderDate, Styles.fontColor]}>{orderTime.toLocaleTimeString() + ", " + orderTime.toLocaleDateString()}</Text>
         </View>
         {/* <View style={Styles.flagContainer}>
            <Text style={[Styles.paidFlag, Styles.fontColor]}>{(paid) ? "Paid" : "Not Paid"}</Text>
            <Text style={[Styles.completedFlag, Styles.fontColor]}>{(ready) ? "Ready" : "Not Ready"}</Text>
            <Text style={[Styles.completedFlag, Styles.fontColor]}>{(pickedUp) ? "Picked Up" : "Not Picked Up"}</Text>
         </View> */}
      </View>
   );
}
export default OrderDetailsHeader;

export const Styles = StyleSheet.create({
   container: {
      // size & layout
      // flex: 0.5,
      paddingTop: 13,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,

      // background/color 
      // backgroundColor: 'green',
      backgroundColor: '#ededf0',

      // shadow
      // shadowColor: "#000",
      // shadowOffset: {
      //    width: 0,
      //    height: 5,
      // },
      // shadowOpacity: 0.36,
      // shadowRadius: 6.68,
      // elevation: 11,
   },
   nameAndDateContainer: {
      flex: 1,
   },
   fontColor: {
      // color: 'white',
      color: 'black',
   },
   orderName: {
      textAlign: 'left',
      fontSize: (screenWidth < 420) ? 28 : 60,
      fontWeight: '500',
      marginBottom: 5,
   },
   orderDate: {
      fontSize: (screenWidth < 420) ? 20 : 36,
      marginBottom: 3,
   },
   flagContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'flex-end'
   },
   paidFlag: {
      fontSize: 30,
   },
   completedFlag: {
      fontSize: 30, 
   },
});