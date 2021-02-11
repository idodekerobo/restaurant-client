import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { GlobalContext } from '../context/GlobalState';

const LoadingScreen = (props) => {   
   return (
      <View style={{backgroundColor: '#c5d9e6',flex: 1, alignItems: 'center'}}>
         <Text style={styles.header}>RHEMI</Text>
         <ActivityIndicator size="large"/>
      </View>
   )
}
export default LoadingScreen;

const styles = StyleSheet.create({
   header: {
      fontSize: 52,
      marginTop: '30%',
      marginBottom: '25%',
      color: '#4e565c',
   },
});