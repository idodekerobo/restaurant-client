import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import OrderQueue from '../containers/OrderQueue';
import { Styles } from '../styles/OrderQueue';
import { Button } from 'react-native-elements';
import { signOutUser } from '../api/api';
import { GlobalContext } from '../context/GlobalState';
import { SIGN_OUT_USER } from '../context/ActionCreators';

export default OrderScreen = (props) => {

   const { dispatch } = useContext(GlobalContext);
   const signOut = () => {
      signOutUser();
      dispatch({type: SIGN_OUT_USER});
   }

   return (
      <SafeAreaView style={{ ...Styles.container }}>
         {/* <Button containerStyle={styles.loginButton} onPress={signOut} title="SIGN OUT USER"/> */}
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