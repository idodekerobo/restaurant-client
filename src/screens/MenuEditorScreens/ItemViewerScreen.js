import React, { useEffect, useState, useContext } from 'react';
import _ from "lodash";
import { Button, Input } from 'react-native-elements';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { ItemProperties, ItemOptions, AddOptionOverlay } from '../../components/Component-Exports';
import { AntDesign } from '@expo/vector-icons';
import { GlobalContext } from '../../context/GlobalState';
import { FETCH_MENUS } from '../../context/ActionCreators';
import { wait, getMenuData, sendEditedItemToDB } from '../../api/api';

const initOptionData = {
   name: '',
   chooseNum: null,
   availChoices: [
      {
      name: '',
      price: null, 
      },
   ]
};

// TODO - put inputs/editing capability into separate component, similar to other components
// TODO - make the refresh time duration be a callback to getting new menu so it takes however long it needs and not a hardcoded 2 seconds
const ItemViewerScreen = ({ route, navigation }) => {
   const { itemData } = route.params;
   const { dispatch } = useContext(GlobalContext);

   const [ optionData, setOptionData ] = useState(initOptionData)
   const [ item, setItem ] = useState(itemData);
   const [ editMode, setEditMode ] = useState(false);
   const [ addOptionOverlayVisibility, setAddOptionOverlayVisibility ] = useState(false);
   const [ inputs, setInputs ] = useState(itemData);
   const [ refreshing, setRefreshing ] = useState(false);

   function onEditButtonPress(e) {
      setEditMode(true);
   }
   const onCancelEditButtonPress = (e) => {
      setEditMode(false);
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
   }

   const onRefresh = () => {
      // get updated menu from db
      fetchUpdatedMenu();
      // set refreshing to true
      setRefreshing(true);
      
      // wait func then set refreshing to false callback
      wait(2000).then( () => setRefreshing(false));
   }

   function onSaveButtonPress(e) {
      // console.log(inputs)
      setEditMode(false);
      
      // set the item so the screen changes
      setItem(inputs)
      
      // send new item to backend
      sendEditedItemToDB(inputs);

      // refresh screen and pull new data from db
      onRefresh();
   }

   function deleteOptionFromItemPress(option) {
      console.log(`delete this option ${option.name}`);
      // clone the input object
      const newInputsObject = _.cloneDeep(inputs);
      const currentOptions = newInputsObject.options; // pointer to the options array in the newInputsObject
      // console.log(currentOptions);
      
      // find id of option in inputs.options
      const index = currentOptions.findIndex(element => {
         return element._id === option._id;
      })

      // remove it from the array
      currentOptions.splice(index, 1);
      // console.log(currentOptions);

      // setInputs to new input object
      setInputs(newInputsObject);
   }

   function deleteOptionChoiceFromItemPress(option, choice) {
      const newInputsObject = _.cloneDeep(inputs); // clone the input object
      const currentOptions = newInputsObject.options; // pointer to the options array in the newInputsObject

      // find index using id of option that we are looking at in inputs.options
      const optionIndex = currentOptions.findIndex(element => {
         return element._id === option._id;
      })

      const availableChoicesToEdit = currentOptions[optionIndex].availChoices;

      if (choice._id === undefined) {
         console.log(`id did not come from the database yet`);
         // TODO - give feedback to restart the app first ?? or just search on name
         return; // nothing runs after this if _id is undefined
      }

      // find index of availChoices using findIndex and id of choice we passed in
      const availChoicesIndex = availableChoicesToEdit.findIndex(element => {
         // if both the element._id and choice._id is undefined -> we need to reload the app so the id's can populate from the database
         return element._id === choice._id;
      })
      
      // remove that index from the availChoice arr of the option we need to edit
      availableChoicesToEdit.splice(availChoicesIndex, 1);

      // set inputs to latest object
      setInputs(newInputsObject);
   }

   function onInputChange(prop, text) {
      // console.log(`changed input of ${prop} to ${text}`);
      setInputs({...inputs, [prop]: text})
      // console.log(inputs);
   }

   const onInputOptionChange = (id, prop, text) => {
      // console.log(`${prop}, ${text}`)
      const newInputsObject = _.cloneDeep(inputs);
      
      // find element index of the object we need to edit inside the options array
      // need to use an element we know that won't change. prop (i.e., name or chooseNum) may work, but _id is better
      const index = newInputsObject.options.findIndex( element => {
         // console.log(`option id passed in function: ${id}`)
         // console.log(`element id from state object: ${element._id}`)
         return element._id === id;
      });

      // creating a pointer to make the code easier to work with
      const pointerToOptionElementToEdit = newInputsObject.options[index];

      // editing the key (using computed property, [prop] of the element) to make it equal to text coming in from the client
      pointerToOptionElementToEdit[prop] = text; 

      // console.log(newInputsObject.options[index]); 
      setInputs(newInputsObject);
   }

   const onInputOptionChoiceChange = (optionId, choiceId, prop, text) => {
      // console.log(`${prop}: ${text}`);
      const newInputsObject = _.cloneDeep(inputs);

      // find element index of the object we need to edit inside the options array
      // need to use an element we know that won't change. prop (i.e., name or chooseNum) may work, but _id is better
      const optionIndex = newInputsObject.options.findIndex( element => {
         // console.log(`option id passed in function: ${optionId}`)
         // console.log(`element id from state object: ${element._id}`)
         return element._id === optionId;
      });

      const optionsArray = newInputsObject.options;
      const optionElement = optionsArray[optionIndex];

      const choiceIndex = optionElement.availChoices.findIndex( element => {
         // console.log(`choice id passed into function: ${choiceId}`);
         // console.log(`element id from state object: ${element._id}`)
         return element._id === choiceId;
      })
      
      const optionChoices = optionElement.availChoices;
      const choiceElement = optionChoices[choiceIndex];

      choiceElement[prop] = text;
      setInputs(newInputsObject);
   }

   const toggleAddOptionOverlay = () => {
      setAddOptionOverlayVisibility(!addOptionOverlayVisibility);
   }

   const onAddNewOptionPress = () => {
      const newOption = _.cloneDeep(optionData);
      const newInputsObject = _.cloneDeep(inputs);

      const optionsArray = newInputsObject.options;
      optionsArray.push(newOption);
      setInputs(newInputsObject);

      setOptionData(initOptionData);
      toggleAddOptionOverlay();
   }

   let versionToShow;
   if (editMode) {
      versionToShow = inputs.options;
   } else {
      versionToShow = item.options
   }
   
   // const itemProperties = (editMode) ? Object.keys(inputs) : Object.keys(item);
   const itemProperties = Object.keys(item);
   const properties = itemProperties.map((prop, i) => {
      // not displaying these because they are either arrays of objects or non-value add to the user (need to eventually delete the unused addon properties)
      if (prop !== 'options' && prop !== 'availableAddOns' && prop !== '_id' && prop !== 'selectedAddOns' && prop !== '__v' && prop !== 'restaurantId' && prop !== 'onSale' && prop !== 'inStock' && prop !== 'discount') {
         return (
            <ItemProperties
               key={i}
               item={item}
               itemProperty={prop}
               editMode={editMode}
               inputs={inputs}
               onInputChange={onInputChange} />
         );
      }
   });

   let options;
   if ( !editMode && (!inputs.options) ) {
      // || !(Object.keys(inputs.options[0]).length > 0)
      // || inputs.options[0].name
      options = <View style={{marginBottom: 10}}><Text style={styles.subheaderFontStyle}>No Options</Text></View>
   } else {
      // const options = item.options.map((option, i) => {
      options = versionToShow.map((option, i) => {
   
         const choices = option.availChoices.map((choice, i) => {
            return (
               <View key={i} style={styles.optionChoicesContainer}>
                  
                  {(!editMode) ?
                     <Text style={{fontSize: 18, textAlign: 'right'}}>{choice.name}: ${(choice.price) ? (choice.price*1).toFixed(2) : `0.00`}</Text>
                     :
                     <View style={{marginRight:0, padding: 0,flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '80%'}}>
                        <Input containerStyle={{width: '25%', }} value={`${choice.name}`} placeholder={`${choice.name}`} onChangeText={(text) => onInputOptionChoiceChange(option._id, choice._id, 'name', text)} />
                        <Input containerStyle={{width: '25%', }} value={`$${(choice.price*1).toFixed(2)}`} placeholder={`$${(choice.price*1).toFixed(2)}`} onChangeText={(text) => onInputOptionChoiceChange(option._id, choice._id, 'price', text)} />
                        <TouchableOpacity onPress={() => deleteOptionChoiceFromItemPress(option, choice)}>
                           <AntDesign name="delete" size={20} color="black" />
                        </TouchableOpacity>
                     </View>
                  }
               </View>
            )
         });
   
         return (
            <View key={i} style={styles.optionContainer}>
               
               {(!editMode) ?
                  <View>
                     <Text style={styles.subheaderFontStyle}>{option.name}</Text>
                     <Text style={styles.subheaderFontStyle}>Max Amount to Select: {option.chooseNum}</Text>
                  </View>
                  :
                  <View style={{width: '20%', flexDirection: 'row', justifyContent: 'space-between'}}>
                     <View style={{alignSelf: 'center'}}>
                        <TouchableOpacity onPress={() => deleteOptionFromItemPress(option)}>
                           <AntDesign name="delete" size={24} color="black" />
                        </TouchableOpacity>
                     </View>
                     <View style={{width: '100%'}}>
                        <Input containerStyle={{width: '100%', }} value={`${option.name}`} placeholder={`${option.name}`} onChangeText={(text) => onInputOptionChange(option._id, 'name', text)} />
                        <Input containerStyle={{width: '100%', }} value={`${option.chooseNum}`} placeholder={`Enter max number to choose: ${option.chooseNum}`} onChangeText={(text) => onInputOptionChange(option._id, 'chooseNum', text)} />
                     </View>
                  </View>
               }
               <View>
                  {choices}
               </View>
            </View>
         )
      })
      
   }


   useEffect(() => {
      // console.log(item)
   }, [ ])

   return (
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         <AddOptionOverlay 
            visibility={addOptionOverlayVisibility} 
            toggleOverlay={toggleAddOptionOverlay} 
            itemData={item}
            optionData={optionData}
            setOptionData={setOptionData}
            onAddNewOptionPress={onAddNewOptionPress} />
         
         {(!editMode) ? <Button title="Edit" onPress={event => onEditButtonPress(event)} /> : <Button title="Cancel" onPress={event => onCancelEditButtonPress(event)} /> }
         
         {properties}
         
         <View style={{...styles.itemPropertyContainer, flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: 8}}>
               <Text style={styles.labelFontStyle}>Options:</Text>

               { (editMode) ? 
                  <TouchableOpacity onPress={toggleAddOptionOverlay}>
                     <AntDesign name="pluscircle" size={24} color="black" />
                  </TouchableOpacity>
                  :
                  null
               }
            </View>
            {options}
         </View>

         {(editMode) ? <Button title="Save" onPress={event => onSaveButtonPress(event)} /> : null }
         <View style={{height: 100}}></View>
      </ScrollView>
   )   
}

export default ItemViewerScreen;

const styles = StyleSheet.create({
   container: {
      // flex: 1,
      marginTop: 20,
      marginBottom: 200,
      marginLeft: 50,
      marginRight: 50,
      justifyContent: 'flex-start',
      alignContent: 'flex-end',
   },
   itemPropertyContainer: {
      marginBottom: 15,
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderColor: 'black',
   },
   optionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexShrink: 1,
      marginBottom: 15,
   },
   optionChoicesContainer: {
      marginBottom: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      // width: '50%',
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
});