import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MenuHomeScreen, MenuEditorScreen, CategoryViewerScreen, ItemViewerScreen, } from '../screens/Screen-Exports';

const Stack = createStackNavigator();

const MenuStackNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen name="Menu" component={MenuHomeScreen} />
         <Stack.Screen name="Menu Editor" component={MenuEditorScreen} options={({ route }) => ({ title: `Categories for ${route.params.menuData.name}`})} />
         <Stack.Screen name="Category Viewer" component={CategoryViewerScreen} options={ ({route}) => ({ title: `${route.params.categoryData.name}`}) } />
         <Stack.Screen name="Item Viewer" component={ItemViewerScreen} options={ ({route}) => ({ title: `${route.params.itemData.name}`}) } />
      </Stack.Navigator>
   )
}
export default MenuStackNavigator;