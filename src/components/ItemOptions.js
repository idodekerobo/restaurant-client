import React, { useEffect, useState } from 'react';
import { Button, Input } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import {  } from '../api/api'

// ({ item, itemProperty, editMode, inputs, onInputChange })

const ItemOptions = ({ option, choices, editMode, setEditMode, inputs, onInputChange  }) => {

   return (
      <View style={styles.componentWrapper}>
         <Text>item options yada yada</Text>
      </View>
   )
}

export default ItemOptions;

const styles = StyleSheet.create({
   componentWrapper: {},
})