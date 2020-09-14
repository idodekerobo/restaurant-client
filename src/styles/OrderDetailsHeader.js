import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   container: {
      backgroundColor: 'green',
      borderRadius: 5,
      paddingTop: 13,
      paddingBottom: 13,
      paddingLeft: 5,
      paddingRight: 5,
   },
   fontColor: {
      color: 'white',
   },
   orderName: {
      textAlign: 'left',
      fontSize: 35,
      fontWeight: '500',
      marginBottom: 2,
   },
   orderDate: {
      fontSize: 16, 
   },
   flagContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
   },
   paidFlag: {
      fontSize: 16, 
   },
   completedFlag: {
      fontSize: 16, 
   },
});