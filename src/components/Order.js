import React from 'react';
import { View, Text } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { Styles } from '../styles/Order';

export default Order = (props) => {
   // TODO - need to check if everything is undefined first before rendering
   const { firstName, lastName, orderItems, subtotal, tax, totalCost, orderPlacedDate, paid, ready, entered, pickedUp } = props.data

   // TODO - how to remove the seconds from the time
   let orderDate;
   if (orderPlacedDate) {
      orderDate = new Date(orderPlacedDate);
      orderDate = orderDate.toLocaleTimeString() + ", " + orderDate.toLocaleDateString();
   } else {
      orderDate = orderPlacedDate;
   }

   // have to check if orderItems is undefined first
   let order;
   // if (orderItems) {
   //    order = orderItems.map( (items, i) => (
   //       <Text key={(items._id) ? (items._id,i) : i} style={[Styles.fontColor, Styles.orderItemDetails]}>{items.name}, ${items.price}</Text>
   //    ));
   // } else {
   //    order = null;
   // }
   if (orderItems) {
      order = orderItems.length;
   }
   
   let orderPayStatus;
   if (paid) orderPayStatus = {color: 'white'}
   if (!paid) orderPayStatus = {color: '#e72325'}

   let payStatus;
   let badgeStatus;
   if (paid === true) {
      payStatus = 'PAID';
      badgeStatus = 'success';
   } else {
      payStatus = 'NOT PAID';
      badgeStatus = 'error';
   }

   // TODO - make sure this logic holds up
   let statusFlag;
   if ((ready == true) && (pickedUp == true) && (entered == true)) {
      statusFlag = <View style={Styles.statusFlagContainer}>{/*<Badge value="Ready" status="success" badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText} />*/}<Badge value="Picked Up" status="success" badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText}/></View>
   } else if ((ready == true) && (pickedUp == false) && (entered == true)){
      statusFlag = <View style={Styles.statusFlagContainer}><Badge value="Ready" status="success" badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText} />{/*<Badge value="Not Picked Up" status="warning" badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText}/>*/}</View>
   } else if ((ready == false) && (pickedUp == false) && (entered == true)){
      statusFlag = <View style={Styles.statusFlagContainer}><Badge value="Entered" status="success" badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText} />{/*<Badge value="Entered" status="warning" badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText}/>*/}</View>
   } else {
      statusFlag = <View style={Styles.statusFlagContainer}><Badge value="Not Entered" status="error" badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText}/>{/* <Badge value="Not Picked Up" status="warning"badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText}/> */}</View>
   }

   // TODO - make the dollar values go out to two decimals (have to check for undefined first or will crash the app)
   return (
      <Card containerStyle={[Styles.cardContainer]} >
         <View style={Styles.cardTitleContainer}>
            <Card.Title style={[Styles.cardTitle, Styles.fontColor]}>
               <Text style={Styles.cardTitle}>{firstName + " " + lastName}</Text>
            </Card.Title>
            <Card.Title style={[Styles.cardTitle, Styles.fontColor]}>
               <Text style={Styles.cardTitle}>${totalCost}</Text>
            </Card.Title>
         </View>
         <Card.Divider style={Styles.cardDivider}/>
         <View>
            <Text style={[Styles.orderTimeText, Styles.fontColor]}>{orderDate}</Text>
            
            <View style={Styles.orderItemDetailContainer}>
               <Text style={{...Styles.fontColor, fontSize: 18}}>Items: {order}</Text>
               
               <View style={Styles.pricingContainer}>
                  <View>
                     <Text style={[Styles.fontColor, Styles.orderPricing]}>Subtotal: ${subtotal} </Text>
                     <Text style={[Styles.fontColor, Styles.orderPricing]}>Tax: ${tax} </Text>
                  </View>
                  <View style={Styles.badgeContainer}>
                     <Badge status={badgeStatus} value={payStatus} badgeStyle={Styles.badgeBackgroundView} textStyle={Styles.badgeText} />
                     {statusFlag}
                  </View>
               </View>
            </View>
         </View>
      </Card>
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