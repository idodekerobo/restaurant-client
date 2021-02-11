import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ededf0',
   },
   scrollViewContainer: { 
      flex: 1,
      // backgroundColor: '#fafafc',
      // backgroundColor: '#efeff2',   
      backgroundColor: '#ededf0',
   },
   scrollViewContent: {
      flexGrow: 1,
      // backgroundColor: '#fafafc',
   },
   buttonGroupContainer: {
      flex: 2,
      minHeight: 150,
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 30,
   },
   buttonGroupTextStyle: {
      fontSize: 42,
   },
   buttonGroupStyle: {
      // backgroundColor: 'yellow'
   },
   selectedButtonStyle: {
      backgroundColor: 'green',
   }
});