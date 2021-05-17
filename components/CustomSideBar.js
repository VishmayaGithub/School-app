import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import Constants from 'expo-constants';
import {DrawerItems} from 'react-navigation-drawer'

export default class CustomSideBar extends React.Component{
  render(){
    return(
      <View>
      <Text></Text>
      <DrawerItems {...this.props}></DrawerItems>
   
      
      </View>
    )
  }
}