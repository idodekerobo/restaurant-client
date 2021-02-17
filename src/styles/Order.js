import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
   fontColor: {
      color: 'black',
   },
   cardContainer: {
      marginTop: 5,
      backgroundColor: '#fff',
      width: '100%',
      marginBottom: 10,
      borderRadius: 5,
      borderWidth: 0,
   },
   cardTitleContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   cardTitle: {
      fontSize: 30,
      fontWeight: '500',
      marginBottom: 2,
   },
   badgeContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 7,
   },
   badgeBackgroundView: {
      width: 110,
      height: 26,
      borderRadius: 100,
      marginRight: 7,
   },
   badgeText: {
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 14,
      fontWeight: 'bold',
   },
   statusFlagContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
   },
   pricingContainer: {
      marginTop: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   statusFlag: {
      fontStyle: 'italic',
      fontSize: 15,
   },
   cardDivider: {
      marginBottom: 5,
   },
   orderPrice: {
      fontSize: 24,
   },
   orderTimeText: {
      margin: 0,
      fontSize: 13,
   },
   orderItemDetailContainer: {
      marginTop: 10,
   },
   orderItemDetails: {
      textTransform: 'capitalize',
      fontSize: 26,
      fontWeight: '400',
   },
   orderPricing: {
      fontSize: 18,
      fontWeight: '500',
   }
 });
 
 // fontFamily: "Source Sans Pro, Helvetica, sans-serif",