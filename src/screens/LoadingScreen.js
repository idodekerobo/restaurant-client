import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

const LoadingScreen = (props) => {   
   return (
      <View style={{backgroundColor: '#c5d9e6',flex: 1, alignItems: 'center'}}>
         <Text style={styles.header}>R H E M I</Text>
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