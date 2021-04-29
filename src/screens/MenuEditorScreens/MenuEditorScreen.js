import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-native-elements';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { MenuCategories } from '../../components/Component-Exports'
import { wait, getMenuData } from '../../api/api';
import { GlobalContext } from '../../context/GlobalState';
import { FETCH_MENUS } from '../../context/ActionCreators';

const MenuEditorScreen = ({ route, navigation }) => {
   const { dispatch } = useContext(GlobalContext);
   const { menuData } = route.params;
   const [ menu, updateMenu ] = useState(menuData);

   const [ editMode, setEditMode ] = useState(false);
   const [refreshing, setRefreshing] = useState(false);


   const onViewMorePress = (el) => {
      navigation.navigate('Category Viewer', {categoryData: el})
   }

   const onEditButtonPress = () => {
      setEditMode(true);
   }
   const onCancelButtonPress = () => {
      setEditMode(false);
   }

   const getMenu = async () => {
      const menus = await getMenuData(); // returns an array of menu's
      // console.log(menus[0].menuCategories[1]['name']);
      dispatch({ type: FETCH_MENUS, menus })

      // TODO - figure out a way to make sure this is the right array element to update
      // TODO - will break when you have more than one menu
      updateMenu(menus[0]); // updating to first menu in the arr
      
      // update the params here - is this necessary???
      navigation.setParams({
         params: { menuData: menus },
         key: 'menu-home-screen'
      })
   }

   const onRefresh = () => {
      getMenu();
      
      setRefreshing(true);
      wait(2000).then( () => setRefreshing(false));
   }

   // const categories = menuData.menuCategories.map((el, i) => {
   // changing to pull from the state (which is init by the route params)
   const categories = menu.menuCategories.map((el, i) => {
      return (
         <MenuCategories
            key={i}
            category={el}
            editMode={editMode}
            setEditMode={setEditMode}
            onRefresh={onRefresh}
            viewMorePress={() => onViewMorePress(el)} />
      )
   })

   // useEffect(() => {
   //    console.log(`data from menu editor screen component: ${menuData}`);
   //    console.log(menuData.menuCategories[1]['name']);
   //    updateMenu(menuData)
   // }, [ menu ])

   return (
      // <View style={{flex: 1, height: '100%'}}>
      <ScrollView style={{flex: 1, width: '95%', marginTop: 30}}  contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         <View style={styles.pageHeaderContainer}>
            {/* <Text style={styles.pageHeaderText}>Categories for {menu.name}</Text> */}
            { (editMode) ? 
               <Button title="Cancel"
                  containerStyle={styles.editButtonContainer}
                  buttonStyle={styles.editButton}
                  titleStyle={styles.editButtonTitle}
                  onPress={() => onCancelButtonPress()} />
               :
               <Button title="Edit"
                  containerStyle={styles.editButtonContainer}
                  buttonStyle={styles.editButton}
                  titleStyle={styles.editButtonTitle}
                  onPress={() => onEditButtonPress()} />
            }
         </View>

         <View style={styles.categoryWrapperStyle}>
            {categories}
         </View>
         <View style={{height: 100}}></View>
      </ScrollView>
      // </View>
   )   
}

export default MenuEditorScreen;

const styles = StyleSheet.create({
   container: {
      // flex: 1,
      // justifyContent: 'flex-start',
      alignItems: 'center',
      // marginTop: 30,
   },
   pageHeaderContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      justifyContent: 'flex-end',
      width: '90%',
      marginBottom: 10,
   },
   pageHeaderText: {
      fontSize: 42,
   },
   editButtonContainer: {   
   },
   editButton: {
   },
   editButtonTitle: {
      fontSize: 22,
   },
   categoryWrapperStyle: {
      flex: 1,
      width: '90%',
      alignItems: 'center',
   },
})