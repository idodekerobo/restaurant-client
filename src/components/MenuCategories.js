import React, { useEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import { saveNewCategoryName } from '../api/api'

const MenuCategories = ({ editMode, setEditMode, viewMorePress, category, onRefresh }) => {
   const [ newCategoryName, setNewCategoryName ] = useState('');

   const onSaveCategoryNamePress = (categoryId) => {
      onRefresh();
      saveNewCategoryName(categoryId, newCategoryName);
      setEditMode(!editMode);
      setNewCategoryName('')
   }

   return (
      <View style={styles.componentWrapper}>

         <View style={styles.categoryContainer}>

            <View style={styles.categoryHeaders}>
               { (!editMode) ? 
                  <Text style={{fontWeight: '500', fontSize: 32}}>{category.name}</Text>
                  :
                  <Input placeholder={category.name}
                     containerStyle={styles.containerStyle}
                     inputContainerStyle={styles.inputContainerStyle}
                     inputStyle={styles.inputStyle}
                     value={newCategoryName} onChangeText={(text) => setNewCategoryName(text)} />
               }
            </View>

            <View style={styles.categoryActionButtonsContainer}>
               {(editMode) ?
                     <Button
                        title="Save Name"
                        containerStyle={styles.categoryActionButtons}
                        onPress={() => onSaveCategoryNamePress(category._id)}
                     />
                  :
                  null
               }
               <Button
                  title={`View ${category.name} Category`}
                  containerStyle={styles.categoryActionButtons}
                  onPress={viewMorePress} />
            </View>
         </View>
      </View>
   )
}
export default MenuCategories; 

const styles = StyleSheet.create({
   componentWrapper: {
      flex: 1,
      width: '100%',
   },
   containerStyle: {
      width: '100%',
      height: '100%',
   },
   inputContainerStyle: {
      width: 300,
   },
   inputStyle: {

   },
   categoryContainer: {
      flex: 1,
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      // borderColor: 'black',
      // borderWidth: 3,
   },
   categoryHeaders: {},
   // categoryName: {
   //    fontWeight: '500',
   //    fontSize: 24,
   //    marginLeft: 7,
   //    marginTop: 5,
   // },
   categoryActionButtonsContainer: {
      flexDirection: 'row',
   },
   categoryActionButtons: {
      marginRight: 15,
   },
})