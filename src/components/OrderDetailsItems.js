import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
// import { ListItem } from 'react-native-elements';
const screenWidth = Dimensions.get('window').width; // 390 for my iphone 12 pro
// const screenHeight = Dimensions.get('window').height; // 844 for my iphone 12 pro


export default OrderDetails = ({items}) => {
   const config = (configObject) => {
      if (!configObject) return;
      let keys = Object.keys(configObject);
      return keys.slice().map( (key, i) => {
         if (Array.isArray(configObject[key])) {
            // console.log(`the veggie arr ${JSON.stringify(configObject[key])}`);
            // console.log(`the veggie arr ${configObject[key][0].name}`);
            return (
               <Text style={Styles.itemDetails} key={i}>
                  {key}: {configObject[key].map( (el, i) => <Text key={i}>{el.name}{(el.price !== 0) ? `, Price: $${el.price.toFixed(2)} ` : `, `}</Text>)} 
                </Text>
            )
         }
         else if (key === 'specialInstructions' && configObject[key] !== ``) {
            return (
               <View style={Styles.itemDetails} key={i}>
                  <Text style={{fontSize: 20}}>Special Instructions:</Text>
                  <Text style={Styles.specialInstructions}>{configObject[key]}</Text>
               </View>
            )
         } else if (!Array.isArray(configObject[key])) {
            return (
               <Text key={i} style={Styles.itemDetails}>{key}: {configObject[key].name}{(configObject[key].price !== 0 && configObject[key].price !== null && configObject[key].price !== undefined) ? `, Price: $${configObject[key].price.toFixed(2)}` : ``}</Text> 
            )
         }
      })
   }
   const itemList = items.slice().map( (item, i) => (
      <View style={Styles.itemContainer} key={item._id,i}>
      {/* <ListItem containerStyle={Styles.itemContainer} key={item._id,i}> */}
         <View style={Styles.innerItemContainer}>
            <Text style={Styles.orderItem}>{item.name}: ${item.price.toFixed(2)}</Text>
            {/* <ListItem.Content style={Styles.itemDetailsContainer}> */}
            <View style={Styles.itemDetailsContainer}>
               {config(item.config)}
            </View>
            {/* </ListItem.Content> */}
         </View>
      {/* </ListItem> */}
      </View>
   ))

   useEffect(() => {
   })
   return (
      <View style={Styles.container}>
         <ScrollView style={Styles.scrollViewContainer} contentContainerStyle={Styles.scrollViewContent}>
         <Text style={Styles.itemHeader}>Items:</Text>
         {itemList}
         </ScrollView>
      </View>
   );
}

export const Styles = StyleSheet.create({
   container: {
      flex: 1,
      maxHeight: '50%',
      backgroundColor: '#fafafc',
      marginTop: 20,
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 10,
      paddingBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,
      elevation: 11,
   },
   scrollViewContainer: { 
      flex: 1,
      // backgroundColor: '#fafafc',
      // backgroundColor: '#efeff2',   
   },
   scrollViewContent: {
      flexGrow: 1,
      backgroundColor: '#fafafc',
   },
   itemContainer: {
      backgroundColor: '#fafafc',
      marginBottom: 5,
      paddingBottom: 10,
      // borderWidth: 1,
      // borderLeftWidth: 0,
      borderBottomWidth: 1,
      borderColor: '#ededf0',
      borderStyle: 'solid',
      borderBottomColor: 'black',
   },
   innerItemContainer: {
      display: 'flex',
      flexDirection: 'column',
      // borderColor: 'red',
      // borderWidth: 3,
   },
   itemHeader: {
      fontSize: (screenWidth < 420) ? 22 : 36,
      fontWeight: '600',
   },
   orderItem: {
      textTransform: 'capitalize',
      fontSize: 28,
      // width: '20%',
   },
   itemDetailsContainer: {
      marginLeft: 10,
   },
   itemDetails: {
      fontSize: 20,
      paddingBottom: 5,
   },
   specialInstructions: {
      marginLeft: 10,
      fontSize: 18,
   },
});