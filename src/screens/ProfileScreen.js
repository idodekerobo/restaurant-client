import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { signOutUser } from '../api/api';
import { GlobalContext } from '../context/GlobalState';
import { SIGN_OUT_USER } from '../context/ActionCreators';

export default ProfileScreen = () => {
   
   const { dispatch } = useContext(GlobalContext);
   const signOut = () => {
      signOutUser();
      dispatch({type: SIGN_OUT_USER});
   }
   
   return (
      <View style={styles.container}>
         <View style={styles.textStyle}>
         </View>
         <Button containerStyle={styles.signOutButton} onPress={signOut} title="Sign Out"/>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,      
      height: '80%',
      width: '80%',
      marginTop: 0,
      marginBottom: 0,
      marginRight: 'auto',
      marginLeft: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      // alignContent: 'center',
   },
   textStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   signOutButton: {
      flex: 1,
      width: '50%',
      marginTop: 100,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
});