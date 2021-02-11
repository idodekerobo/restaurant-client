import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { GlobalContext } from '../context/GlobalState';

const LoadingScreen = (props) => {
   const { state, dispath } = useContext(GlobalContext);
   const [ isLoading, setLoading ] = useState(true);

   // this screen we use to check if the user is signed in and their idToken is authentic w/ firebase

      // if yes, we render home stack

      // if not we render auth stack

   
   useEffect(() => {
      setTimeout(() => {
         setLoading(false)
      }, 3000)
   })
   
   return (
      <SafeAreaView style={styles.wrapperContainer}>
         <View style={styles.container}>
            <Text style={styles.header}>RHEMI</Text>
         </View>
      </SafeAreaView>
   )
}
export default LoadingScreen;

const styles = StyleSheet.create({
   wrapperContainer: {
      flex: 1,
      backgroundColor: '#c5d9e6',
      justifyContent: 'center',
      alignItems: 'center',
   },
   container: {
      flex: 1,
      backgroundColor: '#c5d9e6',
      justifyContent: 'center',
      alignItems: 'center',
   },
   header: {
      fontSize: 52,
   },
});