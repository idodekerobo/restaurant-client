import React, { createContext, useReducer } from 'react';
import { Reducer } from './AppReducer';

const initialState = {
   orders: [{}],
   selectedOrder: {},
}

// create context
export const GlobalContext = createContext();

// Provider component - so all elements have access to global state
// chidlren are the elements we wrap in it
export const GlobalProvider = ({children}) => {
   const [state, dispatch] = useReducer(Reducer, initialState);
   return ( <GlobalContext.Provider value={{state, dispatch}}>
               {children}
            </GlobalContext.Provider>);
}