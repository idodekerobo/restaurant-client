import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import { login } from '../api/api';

const SignInScreen = ({ navigation }) => {
   const { control, handleSubmit, errors } = useForm();
   const onSubmit = data => {
      // send request to server to authenticate this
      // don't authenticate on the client side
      let nextScreen = 'Orders'
      login(data.email, data.password, navigation, nextScreen);
   };

   // const [email, setEmail] = useState('')
   // const [password, setPassword] = useState('')
   return (
      <SafeAreaView style={styles.container}>
         {/* <View> */}

         <View style={styles.headerContainer}>
            <Text h4 h4Style={styles.header}>Log In!</Text>
         </View>

         <View style={styles.formContainer}>
            <Controller
               control={control}
               render={({ onChange, onBlur, value }) => (
                  <Input
                     type="text"
                     placeholder="Email"
                     onChangeText={value => onChange(value)}
                     onBlur={onBlur}
                     value={value}
                  />
               )}
               name="email"
               rules={{required: true}}
               defaultValue=""
            />

            <Controller
               control={control}
               render={({ onChange, onBlur, value }) => (
                  <Input
                     secureTextEntry={true}
                     placeholder="Password"
                     onChangeText={value => onChange(value)}
                     onBlur={onBlur}
                     value={value}
                  />
               )}
               name="password"
               rules={{ required: true }}
               defaultValue=""
            />

            <Button containerStyle={styles.loginButton} title="Log In" onPress={handleSubmit(onSubmit)} />
         </View>
         {/* </View> */}

      </SafeAreaView>
   )
}
export default SignInScreen;

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
   scrollViewContainer: {
      flex: 1,
      alignItems: 'center',
   },
   loginButton: {
      width: '60%',
      marginTop: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
   },
});