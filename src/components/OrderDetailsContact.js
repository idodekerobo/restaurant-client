import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Styles } from '../styles/OrderDetailsContact';

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