import React, { useEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import {  } from '../api/api'

const ItemProperties = ({ item, itemProperty, editMode, inputs, onInputChange }) => {

   return (
   
      <View style={styles.componentWrapper}>
         <View style={ { width: '100%' } }>
            <Text style={styles.labelFontStyle}>{(itemProperty == 'inStock') ? 'In Stock' : (itemProperty == 'onSale') ? 'On Sale' : itemProperty}:</Text>
            {(editMode) ? <Input value={`${inputs[itemProperty]}`} onChangeText={(text) => onInputChange(itemProperty, text) } containerStyle={styles.inputContainerStyle} placeholder={`${item[itemProperty]}`} /> : <Text style={styles.subheaderFontStyle}>{`${item[itemProperty]}`}</Text>}
         </View>
      </View>

   )
}

export default ItemProperties;

const styles = StyleSheet.create({
   componentWrapper: {
      marginBottom: 15,
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderColor: 'black',
   },
   labelFontStyle: {
      fontSize: 18,
      textTransform: 'capitalize',
   },
   subheaderFontStyle: {
      marginLeft: 5,
      fontSize: 22,
      textTransform: 'capitalize'
   },
   inputContainerStyle: {
      margin: 0,
      width: '100%',
   },
})