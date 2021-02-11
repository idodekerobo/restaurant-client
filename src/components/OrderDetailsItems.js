import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Styles } from '../styles/OrderDetailsItems';

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