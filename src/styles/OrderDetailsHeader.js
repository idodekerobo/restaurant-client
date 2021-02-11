import { StyleSheet } from 'react-native';

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
      fontSize: 60,
      fontWeight: '500',
      marginBottom: 5,
   },
   orderDate: {
      fontSize: 36, 
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