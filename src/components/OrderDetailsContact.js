import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
const screenWidth = Dimensions.get('window').width; // 390 for my iphone 12 pro
// const screenHeight = Dimensions.get('window').height; // 844 for my iphone 12 pro

const OrderDetailsContact = ({phone, email}) => {

   // const windowWidth = useWindowDimensions().width;
   // let flexDirection = {}
   // if (windowWidth < 380) {
   //    flexDirection = {flexDirection: 'column',}
   // } else {
   //    flexDirection = {flexDirection: 'row'}
   // }

   // TODO - style the phone number so it looks like aaa-bbb-cccc
   // function spliceString(str, index, count, add) {
   // }
   return (
      <View style={[Styles.container]}>
         <View style={Styles.contactContainer}>
            <Text style={Styles.contactLabel}>Email</Text>
            <Text style={Styles.contactInfo}>{email}</Text>
         </View>

         <View style={Styles.contactContainer}>
            <Text style={Styles.contactLabel}>Phone</Text>
            <Text style={Styles.contactInfo}>{phone}</Text>
         </View>
      </View>
   );
}
export default OrderDetailsContact;

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
      fontSize: (screenWidth < 420) ? 18 : 24,
      fontWeight: 'bold',
   },
   contactInfo: {
      fontSize: (screenWidth < 420) ? 22 : 28,
   },
});