import React, { useEffect, useState } from 'react';
import _ from "lodash";
import { Button, Input, Overlay } from 'react-native-elements';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// import { addOptionToItem } from '../api/api';

const AddOptionOverlay = ({ visibility, toggleOverlay, itemData, optionData, setOptionData, onAddNewOptionPress }) => {
   // const [ optionData, setOptionData ] = useState(initOptionData)

   return (
      <Overlay overlayStyle={styles.overlayStyle} 
      toggleOverlay={toggleOverlay}
      isVisible={visibility} onBackdropPress={toggleOverlay}
      children={<OverlayContent itemData={itemData} optionData={optionData} setOptionData={setOptionData} toggleOverlay={toggleOverlay} onAddNewOptionPress={onAddNewOptionPress} />} />
   );
}

export default AddOptionOverlay;

const OverlayContent = ({toggleOverlay, optionData, setOptionData, itemData, onAddNewOptionPress }) => {

   const onChange = (text, property, arrIndex, arrObjProp) => {
      // check if property is an object
      if (typeof optionData[property] === 'object' && optionData[property] != null) {
         // find the arr element in availChoices object arr it should be using
         let object = optionData[property];

         // set the new input of that object
         object[arrIndex][arrObjProp] = text;

         // merge it w/ the rest of the optionData 
         const newOptionObject = {...optionData, [property]: object};

         // update state
         setOptionData(newOptionObject)
         // console.log(newOptionObject);
      } else {
         const newOptionObject = {...optionData, [property]: text}
         // console.log(newOptionObject)
         setOptionData(newOptionObject)
      }
   }

   const addAnotherChoicePress = (property) => {
      const newOptionData = _.cloneDeep(optionData);
      newOptionData[property].push({
         name: '',
         price: null,
      })
      setOptionData(newOptionData);
   }

   const availChoicesInputs = optionData.availChoices.map((choice, i) => {
      return (
         <View key={i} style={styles.availChoicesontainer}>
            <Input placeholder="Option Name i.e., Steak" value={choice.name} onChangeText={(text) => onChange(text, 'availChoices', i, 'name')} />
            <Input placeholder="Option Price i.e., 1.50" value={choice.price} onChangeText={(text) => onChange(text, 'availChoices', i, 'price')} />
         </View>
      );
   })
   
   return (
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.overlayContentContainer}>
         <View style={{flex: 1}}>
            <Text style={{fontSize: 32, marginBottom: 10,}}>Add a new option to this item!</Text>
            <Input placeholder="Name i.e., Meat" value={optionData.name} onChangeText={(text) => onChange(text, 'name')} />
            <Input placeholder="Number to choose i.e., 1" value={optionData.chooseNum} onChangeText={(text) => onChange(text, 'chooseNum')} />
            <View style={{ flexDirection: 'column'}}>
               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5,}}>
                  <Text style={{fontSize: 24}}>Choices</Text>
                  <TouchableOpacity onPress={() => addAnotherChoicePress('availChoices')}>
                     <AntDesign name="pluscircle" size={30} color="black" />
                  </TouchableOpacity>
               </View>
               {availChoicesInputs}
            </View>
            <Button 
               containerStyle={styles.addNewOptionButtonContainer} 
               buttonStyle={styles.addNewOptionButtonStyle} 
               titleStyle={styles.addNewOptionButtonTitleStyle} 
               title="Add New Option" 
               onPress={onAddNewOptionPress} />
         </View>
      </ScrollView>
   );
}


const styles = StyleSheet.create({
   overlayStyle: {
      flex: 1,
      marginTop: 100,
      marginBottom: 100,
      width: '85%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   scrollViewStyle: {
      flex: 1,
      width: '100%', 
   },
   overlayContentContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 75,
      marginRight: 75,
   },
   availChoicesontainer: {
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 10,
      borderColor: 'black',
      borderBottomWidth: 1,
   },
   addNewOptionButtonContainer: {
      marginTop: 20,
      marginBottom: 20,
   },
   addNewOptionButtonStyle: {
      height: 60,
   },
   addNewOptionButtonTitleStyle: {
      fontSize: 28, 
   },
})