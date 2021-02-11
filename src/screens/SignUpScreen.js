import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import { login } from '../api/api';

const SignUpScreen = ({ navigation }) => {
   const { control, handleSubmit, errors } = useForm();
   const onSubmit = data => {
   };

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.headerContainer}>
            <Text h4 h4Style={styles.header}>Sign Up for Rhemi!</Text>
         </View>
         <View style={styles.formContainer}>
            <Button containerStyle={styles.loginButton} title="Sign Up" onPress={handleSubmit(onSubmit)} />
         </View>

      </SafeAreaView>
   )
}
export default SignUpScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingTop: 50,
      backgroundColor: '#efeff2',
      justifyContent: 'center',
      alignItems: 'center',
   },
   headerContainer: {
      flex: 1,
      marginTop: '10%',
   },
   header: {
      marginBottom: 5,
      fontSize: 40,
   },
   formContainer: {
      flex: 2,
      width: '90%'
   },
   loginButton: {
      width: '60%',
      marginTop: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
});