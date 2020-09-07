import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Styles } from '../styles/Order';

export default Order = (props) => {
   // TODO - need to check if everything is undefined first before rendering
   const { firstName, lastName, orderItems, phone, email, subtotal, tax, totalCost, orderPlacedDate, completed } = props.data
   

   // have to check if orderItems is undefined first
   var order;
   if (orderItems) {
      order = orderItems.map( (items, i) => (
      <Text key={i} style={[Styles.fontColor, Styles.orderItemDetails]}>{items.name}, ${items.price}</Text>
      ));
   } else {
      order = null;
   }

   // TODO - color code the orders - green for completed, blue for open 
   // TODO - add a big flag that says PAID in green or NOT PAID in red
   // TODO - add button/logic to make it
   return (
      // <View>
         <Card wrapperStyle={Styles.cardWrapper} containerStyle={Styles.cardContainer}>
            <Card.Title style={[Styles.cardTitle, Styles.fontColor]}>{firstName + " " + lastName}</Card.Title>
            <Card.Divider style={Styles.cardDivider}/>
            <View style={Styles.orderInfoWrapper}>
               <Text style={[Styles.orderPrice, Styles.fontColor]}>Total: ${totalCost}</Text>
               <Text style={[Styles.orderTimeText, Styles.fontColor]}>{orderPlacedDate}</Text>
               <View style={Styles.orderItemDetailContainer}>
                  <Text style={{...Styles.fontColor, fontSize: 15}}>Items:</Text>
                  {order}
                  <View style={{marginTop: 15}}>
                     <Text style={[Styles.fontColor, Styles.orderPricing]}>Subtotal: ${subtotal} </Text>
                     <Text style={[Styles.fontColor, Styles.orderPricing]}>Tax: ${tax} </Text>
                  </View>
               </View>
            </View>
         </Card>
      // </View>
   )
}
/*
{
   "__v": 0,
   "_id": "5f4c8953fa1fd023ae26e607",
   "city": "Tempe",
   "completed": false,
   "email": "idode.kerobo@gmail.com",
   "firstName": "Idode",
   "lastName": "Kerobo",
   "orderItems": Array [
     {
       "__v": 0,
       "_id": "5e951647d7124410240348fe",
       "discount": 0,
       "inStock": true,
       "name": "burrito",
       "onSale": false,
       "price": 8,
     },
     {
       "__v": 0,
       "_id": "5ea4b252747ca2087be2e7a2",
       "discount": null,
       "inStock": false,
       "name": "chimichanga",
       "onSale": null,
       "price": 9,
     },
   ],
   "orderPlacedDate": "2020-08-31T05:19:55.892Z",
   "phone": "1112223333",
   "state": "Arizona",
   "subtotal": 17,
   "tax": 1.7,
   "totalCost": 18.7,
   "zip": "85284",
 }
 */