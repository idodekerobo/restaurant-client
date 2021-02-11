import { StyleSheet } from 'react-native';

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
      fontSize: 30,
   },
   subtotal: {
      paddingBottom: 2,
   },
   tax: {
      paddingBottom: 5,
   },
   totalCost: {
      fontSize: 40,
      fontWeight: 'bold',
   },
});