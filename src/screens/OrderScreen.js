import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import OrderQueue from '../containers/OrderQueue';
import { Styles } from '../styles/OrderQueue';
import { Button } from 'react-native-elements';
import { retrieveAuthToken, checkAuthStatus } from '../api/api';

export default OrderScreen = (props) => {

   return (
      <SafeAreaView style={{ ...Styles.container }}>
         {/* <View > */}
            <Button containerStyle={styles.loginButton} onPress={checkAuthStatus} title="CLICK"/>
         {/* </View> */}
         <OrderQueue navigate={props.navigation.navigate}/>
      </SafeAreaView>
   )
}
const styles = StyleSheet.create({
   loginButton: {
      flex: 1,
      width: '50%',
      marginTop: 100,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
})