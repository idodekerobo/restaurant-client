import React, { useEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { saveNewItemName } from '../api/api'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CategoryItems = ({ editMode, setEditMode, viewMorePress, item, onRefresh }) => {
   const [ newName, setNewName ] = useState('');

   const onSaveItemNamePress = (itemId) => {
      onRefresh();
      saveNewItemName(itemId, newName);
      setEditMode(!editMode);
      setNewName('')
   }

   return (
      <View style={styles.componentWrapper}>
         
         <View style={styles.itemContainer}>

            <View style={styles.itemHeader}>
               { (!editMode) ? 
                  <Text style={styles.itemNameFontStyle}>{item.name}</Text>
                  :
                  <Input placeholder={item.name}
                     containerStyle={styles.containerStyle}
                     inputContainerStyle={styles.inputContainerStyle}
                     inputStyle={styles.inputStyle}
                     value={newName} onChangeText={(text) => setNewName(text)} />
               }
            </View> 

            <View style={styles.itemActionButtonsContainer}>
               {(editMode) ?
                     <Button
                        title="Save Name"
                        containerStyle={styles.itemActionButtons}
                        onPress={() => onSaveItemNamePress(item._id)}
                     />
                  :
                  <Button
                  // title={`View ${item.name}`}
                  title={`View`}
                  containerStyle={styles.itemActionButtons}
                  onPress={viewMorePress} />
               }
            </View>
         </View>
      </View>
   )
}

export default CategoryItems;

const styles = StyleSheet.create({
   componentWrapper: {
      flex: 1,
      width: '100%',
   },
   itemContainer: {
      flex: 1,
      margin: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   itemNameFontStyle: {
      fontWeight: '500',
      fontSize: 18
   },
   itemHeaders: {

   },
   containerStyle: {
      width: '100%',
      height: '100%',
   },
   inputContainerStyle: {
      // width: 300,
      width: (windowWidth < 450) ? 150 : 300,
   },
   inputStyle: {

   },
   itemActionButtonsContainer: {
      flexDirection: 'row',
   },
   itemActionButtons: {
      marginRight: 15,
   },
})