import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { Styles } from '../styles/OrderDetailsContact';

const OrderDetailsContact = ({phone, email}) => {

   const windowWidth = useWindowDimensions().width;
   let flexDirection = {}
   if (windowWidth < 380) {
      flexDirection = {flexDirection: 'column',}
   } else {
      flexDirection = {flexDirection: 'row'}
   }

   // TODO - style the phone number so it looks like aaa-bbb-cccc
   // function spliceString(str, index, count, add) {
   // }
   return (
      <View style={[Styles.container, flexDirection]}>
         <View style={Styles.emailContainer}>
            <Text style={Styles.emailLabel}>Email:</Text>
            <Text style={Styles.email}>{email}</Text>
         </View>

         <View style={Styles.phoneContainer}>
            <Text style={Styles.phoneLabel}>Phone:</Text>
            <Text style={Styles.phone}>{phone}</Text>
         </View>
      </View>
   );
}
export default OrderDetailsContact;