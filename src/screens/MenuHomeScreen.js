import React, { useEffect, useState, useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { ScrollView, StyleSheet, SafeAreaView, View, Text, RefreshControl } from 'react-native';
import { GlobalContext } from '../context/GlobalState'
import { FETCH_MENUS } from '../context/ActionCreators';
import { wait, getMenuData, saveNewMenuName } from '../api/api';

// TODO - (??????) dont pass in data as route params (they do not rerender) instead pass in as props
const MenuHomeScreen = (props) => {
   const { state, dispatch } = useContext(GlobalContext);

   const [ editMode, setEditMode ] = useState(false);
   const [ newMenuName, setNewMenuName ] = useState('')
   const [ refreshing, setRefreshing ] = useState(false);

   const getMenu = async () => {
      const menus = await getMenuData(); // returns an array of menu's
      dispatch({type: FETCH_MENUS, menus})
   }

   const onEditButtonPress = (e) => {
      console.log(e);
      setEditMode(true);
   }
   const onCancelButtonPress = (e) => {
      console.log(e);
      setEditMode(false);
   }

   let menuComponents;
   if (state.menus) {
      menuComponents = state.menus.map((el, i) => {
         return (
            <View key={i} style={{ flex: 1, width: '100%'}}>
   
               <View style={styles.menuContainer}>
                  <View style={styles.menuHeaders}>
                     {(editMode) ? 
                        <Input
                           containerStyle={{width: '100%', height: '100%'}}
                           inputContainerStyle={{width: 300}} placeholder={el.name}
                           value={newMenuName}
                           onChangeText={(value) => setNewMenuName(value)} />
                        :
                        <Text style={styles.menuName}>{el.name}</Text>
                     }
                  </View>
                  
                  <View style={styles.menuActionButtonsContainer}>
                     { (editMode) ? <Button containerStyle={styles.menuActionButtons} title="Save Name" onPress={() => onSaveMenuNamePress(newMenuName, el._id)} /> : null }
                     {/* <Button containerStyle={styles.menuActionButtons}  title={`View ${el.name}`} onPress={() => props.navigation.navigate('Menu Editor',{ menuData: el }, 'menu-home-screen')} /> */}
                     <Button containerStyle={styles.menuActionButtons}  title={`View ${el.name}`} onPress={() => props.navigation.navigate({name: 'Menu Editor', params: { menuData: el }, key: 'menu-home-screen'})} />
                  </View>
               </View>   
   
            </View>
         )
      })
   }

   const onRefresh = async () => {
      getMenu();
      setRefreshing(true);
      wait(2000).then( () => setRefreshing(false));
   }

   const onSaveMenuNamePress = (newMenuName, menuId) => {
      saveNewMenuName(menuId, newMenuName);
      setNewMenuName('');
      setEditMode(false);
      onRefresh();
   }

   useEffect(() => {
      getMenu();
   }, [ ])

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView  style={styles.scrollViewContainer} contentContainerStyle={styles.scrollViewContent} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10,}}>
               <Text style={styles.pageHeaderText}>Menu's</Text>
               {(!editMode) ?
                  <Button title="Rename Menu's"
                     containerStyle={styles.editButtonContainer}
                     buttonStyle={styles.editButton}
                     titleStyle={styles.editButtonTitle}
                     onPress={event => onEditButtonPress(event)} />
                  : 
                  <Button title="Cancel Edit"
                     containerStyle={styles.editButtonContainer}
                     buttonStyle={styles.editButton}
                     titleStyle={styles.editButtonTitle}
                     onPress={event => onCancelButtonPress(event)} />
               }
            </View>
            <View style={{flex: 1, width: '90%', alignItems: 'center',}}>
               {menuComponents}
            </View>
         </ScrollView>
      </SafeAreaView>
   )   
}

export default MenuHomeScreen;

const styles = StyleSheet.create({
   scrollViewContainer: {
      // borderColor: 'yellow',
      // borderWidth: 3,
      flex: 1,
      width: '95%',
   },
   scrollViewContent: {
      flex: 1,
      // borderWidth: 3,
      // borderColor: 'red',
   },
   container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 30,
   },
   pageHeaderText: {
      fontSize: 42,
   },
   editButtonContainer: {
      
   },
   editButton: {
      // height: '100%',
   },
   editButtonTitle: {
      fontSize: 30,
   },
   menuContainer: {
      flex: 1,
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // borderColor: 'black',
      // borderWidth: 3,
   },
   menuHeaders: {},
   menuName: {
      fontWeight: '500',
      fontSize: 24,
      marginLeft: 7,
      marginTop: 5,
   },
   menuActionButtonsContainer: {
      flexDirection: 'row',
   },
   menuActionButtons: {
      marginRight: 15,
   },
})