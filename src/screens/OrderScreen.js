import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import OrderQueue from '../containers/OrderQueue';

export default OrderScreen = (props) => {

   return (
      <SafeAreaView style={styles.container}>
         <OrderQueue navigate={props.navigation.navigate}/>
      </SafeAreaView>
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#ededf0',
      alignItems: 'center',
      justifyContent: 'center',
   },
})