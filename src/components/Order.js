import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default Order = (props) => {
   // const { totalCost } = props.obj
   const name = props.name;
   const email = props.email;

   return (
      <Text>
         {name, email}
      </Text>
   )
}