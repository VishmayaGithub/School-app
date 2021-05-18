import * as React from 'react';
import { StyleSheet, Text, Image } from 'react-native';

import Welcome from './Screens/Welcome';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppDrawerNavigator from './components/AppDrawerNavigator';
import HomeScreen from './Screens/HomeScreen';
import HomeworkGiven from './Screens/HomeworkGiven';
import EditHomework from './Screens/EditHomework';
import completedHomework from './Screens/completedHomework';

export default class App extends React.Component {
  render() {
    return <Appcontainer />;
  }
}
var Navigator = createSwitchNavigator({
  Welcome: { screen: Welcome },
  
  HomeScreen: { screen: HomeScreen },
Drawer: { screen: AppDrawerNavigator },
  HomeworkGiven: { screen: HomeworkGiven },
  EditHomework: { screen: EditHomework },
  completedHomework: { screen: completedHomework },
});

const Appcontainer = createAppContainer(Navigator);
