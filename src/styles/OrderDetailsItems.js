import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   container: {
      flex: 5,
      maxHeight: '50%',
      backgroundColor: '#fafafc',
      marginTop: 20,
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 10,
      paddingBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
   },
   scrollViewContainer: { 
      flex: 1,
      // backgroundColor: '#fafafc',
      // backgroundColor: '#efeff2',   
   },
   scrollViewContent: {
      flexGrow: 1,
      backgroundColor: '#fafafc',
   },
   itemContainer: {
      backgroundColor: '#fafafc',
      marginBottom: 5,
      paddingBottom: 10,
      // borderWidth: 1,
      // borderLeftWidth: 0,
      borderBottomWidth: 1,
      borderColor: '#ededf0',
      borderStyle: 'solid',
      borderBottomColor: 'black',
   },
   innerItemContainer: {
      display: 'flex',
      flexDirection: 'row',
   },
   itemHeader: {
      fontSize: 36,
      fontWeight: '500',
   },
   orderItem: {
      textTransform: 'capitalize',
      fontSize: 28,
      width: '20%',
   },
   itemDetailsContainer: {
      marginLeft: 10,
   },
   itemDetails: {
      fontSize: 20,
      paddingBottom: 5,
   },
   specialInstructions: {
      marginLeft: 10,
      fontSize: 18,
   },
});