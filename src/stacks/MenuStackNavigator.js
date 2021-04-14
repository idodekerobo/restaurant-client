import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuHomeScreen, MenuEditorScreen, CategoryViewerScreen, ItemViewerScreen, } from '../screens/Screen-Exports';

const Stack = createStackNavigator();

const MenuStackNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name="Menu" component={MenuHomeScreen} />
         <Stack.Screen name="Menu Editor" component={MenuEditorScreen} />

         <Stack.Screen name="Category Viewer" component={CategoryViewerScreen} />

         <Stack.Screen name="Item Viewer" component={ItemViewerScreen} />
      </Stack.Navigator>
   )
}
export default MenuStackNavigator;