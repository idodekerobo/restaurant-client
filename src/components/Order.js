import React from 'react';
import { View, Text } from 'react-native';

export default Order = (props) => {
   const { firstName, lastName, orderItems, phone, email, subtotal, tax, totalCost, orderPlacedDate, completed } = props.data
   
   // have to check if orderItems is undefined first
   var order;
   if (orderItems) {
      order = orderItems.map( (items, i) => (
         <View key={i}>
            <Text>{items.name}</Text>
         </View>
         ));
   } else {
      order = null;
   }

   return (
      <View>
         <Text>{firstName + " " + lastName}, {email} {orderPlacedDate}</Text>
         {order}
         <Text>{totalCost}</Text>
      </View>
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