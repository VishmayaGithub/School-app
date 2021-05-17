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
import {createDrawerNavigator} from 'react-navigation-drawer'
import HomeScreen from '../Screens/HomeScreen'
import CustomSideBar from './CustomSideBar'
import Settings from '../Screens/Settings'


export const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,      
    },
     Settings: {
      screen: Settings,      
    },
    
  },

  {
    contentComponent: CustomSideBar,
  },
  {
    initialRouteName: 'HomeScreen',
  }
);
export default AppDrawerNavigator;
