import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Input, Text, Button } from 'react-native-elements';
import { useForm, Controller } from "react-hook-form";
import { GlobalContext } from '../context/GlobalState';
import { SIGN_IN_USER } from '../context/ActionCreators';
import firebase from '../services/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OFFLINE_RESTAURANT_ID, OFFLINE_USER_ID_TOKEN_KEY } from '../api/offline_keys'
import { sendIdTokenToServer } from '../api/api';

const SignInScreen = ({ navigation }) => {
   const { control, handleSubmit, errors } = useForm();
   const [ loginError, setLoginError ] = useState('');

   const { dispatch } = useContext(GlobalContext);
   const onSubmit = async data => {
      try {
         const userCredential = await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
         const user = userCredential.user;

         try {
            setLoginError('');
            const idToken = await user.getIdToken();
            const response = await sendIdTokenToServer(idToken);
            // save idToken and restaurantId in async storage
            const idTokenPair = [OFFLINE_USER_ID_TOKEN_KEY, idToken];
            const restaurantIdPair = [OFFLINE_RESTAURANT_ID, response.restaurantId];
            try {
               await AsyncStorage.multiSet([idTokenPair, restaurantIdPair]);
            } catch (e) {
               console.log(`There was an error saving the idToken and restaurantId to storage ${e}`)
            }
            // navigate to next screen if it works by indicating that user is signed in which changes state and triggers rerender
            // also saving uuid in universal state for later use
            dispatch({type: SIGN_IN_USER, userSignedIn: true, userUid: user.uid})
         } catch (err) {
            console.log(`There was an error getting idToken from backend server ${err}`);
         }

      } catch (err) {
         console.log('there was some type of error');
         let errorCode = err.code;
         let errorMessage = err.message;
         console.log(`this is the error code ${errorCode}`);
         console.log(`this is the error message ${errorMessage}`)
         setLoginError(errorMessage);
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
      }
      /* firebase.auth().signInWithEmailAndPassword(data.email, data.password)
      .then(userCredential => {
         setLoginError('');
         const user = userCredential.user;
         // get id token
         user.getIdToken()
         .then(async idToken => {
            // idToken = token;
            // send token to backend to get associated restaurantId in response
            const response = await sendIdTokenToServer(idToken);

            // save idToken and restaurantId in async storage
            const idTokenPair = ['userIdToken', idToken];
            const restaurantIdPair = ['restaurantId', response.restaurantId];
            try {
               await AsyncStorage.multiSet([idTokenPair, restaurantIdPair]);
            } catch (e) {
               console.log(`There was an error saving the idToken and restaurantId to storage ${e}`)
            }
         })
         .catch(err => {
            console.log(`There was an error returning the idToken ${err}`)
         });
         // navigate to next screen if it works by indicating that user is signed in which changes state and triggers rerender
            // also saving uuid in universal state for later use
         dispatch({type: SIGN_IN_USER, userSignedIn: true, userUid: user.uid})
      })
      .catch(err => {
         // Handle Errors here.
         // TODO - return some feedback to the user tbat log in didn't work
         console.log('there was some type of error');
         let errorCode = err.code;
         let errorMessage = err.message;
         console.log(`this is the error code ${errorCode}`);
         console.log(`this is the error message ${errorMessage}`)
         setLoginError(errorMessage);
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
      })*/
   };

   return (
      <KeyboardAwareScrollView
      style={{backgroundColor:'#efeff2'}}
      resetScrollToCoords={{x:0, y:0}}
      contentContainerStyle={styles.container}>

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
            <Text style={styles.loginErrorText}>{ loginError }</Text>

            <Button containerStyle={styles.loginButton} title="Log In" onPress={handleSubmit(onSubmit)} />
         </View>

      </KeyboardAwareScrollView>
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
   loginErrorText: {
      color: 'red',
   },
});