import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Styles } from '../styles/Order';

export default Order = (props) => {
   // TODO - need to check if everything is undefined first before rendering
   const { firstName, lastName, orderItems, subtotal, tax, totalCost, orderPlacedDate, paid, ready, pickedUp } = props.data

   // TODO - how to remove the seconds from the time
   let orderDate;
   if (orderPlacedDate) {
      orderDate = new Date(orderPlacedDate);
      orderDate = orderDate.toLocaleTimeString() + ", " + orderDate.toLocaleDateString();
   } else {
      orderDate = orderPlacedDate;
   }

   // have to check if orderItems is undefined first
   var order;
   if (orderItems) {
      order = orderItems.map( (items, i) => (
         <Text key={(items._id) ? items._id : i} style={[Styles.fontColor, Styles.orderItemDetails]}>{items.name}, ${items.price}</Text>
      ));
   } else {
      order = null;
   }
   
   var orderPayStatus;
   if (paid) orderPayStatus = {color: 'white'}
   if (!paid) orderPayStatus = {color: '#e72325'}

   var payStatus;
   if (paid === true) {
      payStatus = 'PAID'
   } else {
      payStatus = 'NOT PAID'
   }

   // TODO - confirm best color to signal ready v. not ready orders
   pickedUpOrder = {
      backgroundColor: '#3f51b5' // indigo
   }
   openOrder = {
      backgroundColor: '#4caf50' // green
   }
   // TODO - make sure this logic holds up
   var statusFlag;
   if ((ready == true) && (pickedUp == true)) {
      statusFlag = <View><Text style={[Styles.fontColor, Styles.statusFlag]}>Ready</Text><Text style={[Styles.fontColor, Styles.statusFlag]}>Picked Up</Text></View>
   } else if ((ready == true) && (pickedUp == false)){
      statusFlag = <View><Text style={[Styles.fontColor, Styles.statusFlag]}>Ready</Text><Text style={[Styles.fontColor, Styles.statusFlag]}>Not Picked Up</Text></View>
   } else {
      statusFlag = <View><Text style={[Styles.fontColor, Styles.statusFlag]}>Not Ready</Text><Text style={[Styles.fontColor, Styles.statusFlag]}>Not Picked Up</Text></View>
   }

   // TODO - make the dollar values go out to two decimals (have to check for undefined first or will crash the app)
   return (
      // <View>
         <Card containerStyle={[Styles.cardContainer,(pickedUp===true) ? pickedUpOrder : openOrder]} >
            <Card.Title style={[Styles.cardTitle, Styles.fontColor]}>{firstName + " " + lastName}</Card.Title>
            <Card.Divider style={Styles.cardDivider}/>
            <View>
               <Text style={[Styles.orderPrice, Styles.fontColor]}>Total: ${totalCost}</Text>
               <Text style={[Styles.orderTimeText, Styles.fontColor]}>{orderDate}</Text>
               <View style={Styles.orderItemDetailContainer}>
                  <Text style={[orderPayStatus, Styles.orderItemDetails]}>{payStatus}</Text>
                  <Text style={{...Styles.fontColor, fontSize: 15}}>Items:</Text>
                  {order}
                  <View style={Styles.statusFlagContainer}>
                     <View>
                        <Text style={[Styles.fontColor, Styles.orderPricing]}>Subtotal: ${subtotal} </Text>
                        <Text style={[Styles.fontColor, Styles.orderPricing]}>Tax: ${tax} </Text>
                     </View>
                     {statusFlag}
                  </View>
               </View>
            </View>
         </Card>
      // </View>
   )
}
/*
ORDER JSON DATA STRUCTURE
{
   "__v": 0,
   "_id": "5f4c8953fa1fd023ae26e607",
   "city": "Tempe",
   "ready": false,
   "pickedUp": false,
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