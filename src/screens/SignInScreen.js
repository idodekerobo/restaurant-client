import React, { useContext } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from '../context/GlobalState';
import { SIGN_IN_USER } from '../context/ActionCreators';
import firebase from '../services/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
   const { control, handleSubmit, errors } = useForm();
   const { dispatch } = useContext(GlobalContext);
   const onSubmit = data => {
      let idToken;
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
         const user = userCredential.user;
         // get id token
         user.getIdToken()
         .then(token => {
            idToken = token;
            // got id token, save this in async storage
            AsyncStorage.setItem('userIdToken', idToken)
            .then(token => {
               // can save token to global context state here
               console.log(`Successfully saved id token to async storage`);
            })
            .catch(err => {
               console.log(`There was an error saving id token to async storage`);
            })
         })
         .catch(err => {
            console.log(`There was an error returning the idToken ${err}`)
         });
         // navigate to next screen if it works by indicating that user is signed in
         dispatch({type: SIGN_IN_USER, userSignedIn: true})
      })
      .catch(err => {
         // Handle Errors here.
         // TODO - return some feedback to the user tbat log in didn't work
         console.log('there was some type of error');
         let errorCode = err.code;
         let errorMessage = err.message;
         console.log(`this is the error code ${errorCode}`);
         console.log(`this is the error message ${errorMessage}`)
         switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
               // set the error for all three
               break;
            case "auth/wrong-password":
               // set password error message
               break;
         }
      })
   };

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