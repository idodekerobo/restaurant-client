import { StyleSheet, Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width; // 390 for my iphone 12 pro
const screenHeight = Dimensions.get('window').height; // 844 for my iphone 12 pro

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
      // minHeight: 150,
      minHeight: (screenHeight < 850) ? 90 : 150,
      marginTop: 20,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 30,
   },
   buttonGroupTextStyle: {
      fontSize: (screenWidth < 420) ? 24 : 42,
   },
   buttonGroupStyle: {
      // backgroundColor: 'yellow'
   },
   selectedButtonStyle: {
      backgroundColor: 'green',
   }
});