import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet, ScrollView, View, Text, RefreshControl } from 'react-native';
import { CategoryItems } from '../../components/Component-Exports'
import { wait, getMenuData } from '../../api/api';
import { GlobalContext } from '../../context/GlobalState';
import { FETCH_MENUS } from '../../context/ActionCreators';

const CategoryViewerScreen = ({ route, navigation }) => {
   const { categoryData } = route.params;
   const { dispatch, state } = useContext(GlobalContext)
   
   const [ category, updateCategory ] = useState(categoryData);
   const [ editMode, setEditMode ] = useState(false);
   const [ refreshing, setRefreshing ] = useState(false);

   
   const onEditButtonPress = () => {
      setEditMode(true);
   }
   const onCancelButtonPress = () => {
      setEditMode(false);
   }

   const onViewMorePress = (el) => {
      navigation.navigate('Item Viewer', {itemData: el})
   }

   const fetchUpdatedMenu = async () => {
      const menus = await getMenuData();

      // update the universal state w/ react context
      dispatch({ type: FETCH_MENUS, menus })
      
      // update the navigation state/route params here
         // is this necessary???
      navigation.setParams({
         params: { menuData: menus },
         key: 'menu-home-screen'
      })

      // TODO - figure out what category this is using category id and update the local state of this component
      const menuCategories = menus[0].menuCategories;

      // TODO - does this fuck up the original array ??? 
      const currentCategory = menuCategories.find(cat => cat._id === category._id);
      updateCategory(currentCategory);      
   }

   const onRefresh = () => {
      // get updated menu from db
      fetchUpdatedMenu();
      // set refreshing to true
      setRefreshing(true);
      
      // wait func then set refreshing to false callback
      wait(2000).then( () => setRefreshing(false));
   }

   // const categoryItems = categoryData.categoryItems.map((el, i) => {
   // changing to pull from the state (which is init by the route params)
   const categoryItems = category.categoryItems.map((el, i) => {
      return (
         <CategoryItems
            key={i} 
            item={el}
            editMode={editMode}
            setEditMode={setEditMode}
            viewMorePress={() => onViewMorePress(el)}
            onRefresh={onRefresh} />
      )
   })

   useEffect(() => {
      // console.log(categoryData.categoryItems)
   }, [ ])

   return (
      <ScrollView style={{flex: 1, width: '95%', marginTop: 30,}} contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} >
         <View style={styles.pageHeaderContainer}>
            {/* <Text style={styles.pageHeaderText}>{category.name} Category</Text> */}
            { (editMode) ? 
               <Button
                  title="Cancel"
                  onPress={() => onCancelButtonPress()}
                  containerStyle={styles.editButtonContainer}
                  buttonStyle={styles.editButton}
                  titleStyle={styles.editButtonTitle} />
               :
               <Button
                  title="Edit"
                  onPress={() => onEditButtonPress()}
                  containerStyle={styles.editButtonContainer}
                  buttonStyle={styles.editButton}
                  titleStyle={styles.editButtonTitle} />
            }
         </View>
         <View style={styles.itemWrapperStyle}>
            {categoryItems}
         </View>
         <View style={{height: 100}}></View>
      </ScrollView>
   )   
}

export default CategoryViewerScreen;

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
      fontSize: 30,
   },
   itemWrapperStyle: {
      // flex: 1,
      width: '90%',
      alignItems: 'center',
   },
})