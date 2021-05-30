import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Image } from 'react-native-elements';

const LoadingScreen = (props) => {   
   return (
      <View style={{ backgroundColor: '#ffe660', flex: 1, alignItems: 'center' }}>
         <Text style={styles.header}>R H E M I</Text>
         {/* <Image
            source={require('../../assets/rhemi-icon.png')}
            style={{ width: 500, height: 500 }}
            PlaceholderContent={<ActivityIndicator />}
         /> */}
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
      color: '#ff1616',
   },
});