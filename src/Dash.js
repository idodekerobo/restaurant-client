import React, { useContext, useEffect } from 'react';
import { AuthStackNavigator, HomeTabNavigator } from './stacks/Stack-Exports';
import { LoadingScreen } from './screens/Screen-Exports';
import { checkAuthStatus } from './api/api';
import { GlobalContext } from './context/GlobalState';
import { SET_LOADING, SIGN_IN_USER } from './context/ActionCreators';

const Dash = () => {
   const { state, dispatch } = useContext(GlobalContext);  
   
   const authFunction = async () => {
      const auth = await checkAuthStatus();
      if (auth.authStatus === undefined || auth === undefined) {
         console.log(`checkAuthStatus returned undefined`);
         dispatch({type: SET_LOADING, isLoading: false});
      }
      if (auth.authStatus === 'not authorized') {
         dispatch({type: SET_LOADING, isLoading: false});
      }
      if (auth.authStatus === 'authorized') {
         dispatch({type: SET_LOADING, isLoading: false});
         dispatch({type: SIGN_IN_USER, userSignedIn: true});
      }
   }

   useEffect( () => {
      authFunction();
   }, [])

   if (state.isLoading) {
      return (
         <LoadingScreen />
      ) 
   } else if (state.userSignedIn) {
      return <HomeTabNavigator />
   } else {
      return <AuthStackNavigator />
   } 
}
export default Dash;