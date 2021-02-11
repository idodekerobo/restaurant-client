import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   container: {
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 20,
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 10,
      backgroundColor: '#fafafc',
      // borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
   },
   contactContainer: {
      flex: 1,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   contactLabel: {
      // paddingLeft:
      fontSize: 24,
      fontWeight: 'bold',
   },
   contactInfo: {
      fontSize: 28,
   },
});