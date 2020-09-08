import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   fontColor: {
      color: 'white',
   },
   cardContainer: {
      marginTop: 5,
      width: '100%',
      marginBottom: 10,
      borderRadius: 5,
      borderWidth: 0,
   },
   cardTitle: {
      textAlign: 'left',
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 2,
   }, 
   cardDivider: {
      marginBottom: 5,
   },
   cardWrapper: {
      
   },
   orderPrice: {
      fontSize: 24,
   },
   orderTimeText: {
      margin: 0,
      fontSize: 13,
   },
   orderItemDetailContainer: {
      marginTop: 10,
      marginBottom: 10, 
   },
   orderItemDetails: {
      textTransform: 'capitalize',
      fontSize: 26,
      fontWeight: '400',
   },
   orderPricing: {
      fontSize: 18,
      fontWeight: '500',
   }
 });
 
 // fontFamily: "Source Sans Pro, Helvetica, sans-serif",