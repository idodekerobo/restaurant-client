import React from 'react';
import { Dimensions, SafeAreaView, Text } from 'react-native';
import { Styles } from './styles/Dash'
import OrderQueue from './containers/OrderQueue'

export default class Dash extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         // to manage orientation flip from portrait to landscape
         width: Dimensions.get('window').width,
         height: Dimensions.get('window').height,
      }

      // to manage orientation flip from portrait to landscape
      Dimensions.addEventListener("change", e => {
         this.setState(e.window);
      })
   }

   render() {
      return (
         <SafeAreaView style={{...Styles.container, width: this.state.width, height: this.state.height}}>
            {/* <Text>This is where you can view incoming orders for Dash!</Text> */}
            <OrderQueue/>
         </SafeAreaView>
      );
   }

}