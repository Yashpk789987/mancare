import React from 'react';
import { Constants } from 'expo';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

// import AddStateCity from './AddStateCity'
import ReportsNavigator from './ReportsNavigator';
import AddEmployee from './AddEmployee'


// let StateCity = AddStateCity;
let Employee = AddEmployee
let Reports = ReportsNavigator

const Navigations = TabNavigator({
  Reports: { screen: Reports },
  // StateCity: { screen: StateCity },
  Employee: { screen: Employee}
});

export default class AdminTab extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return(
      <Navigations />
    );
  }

}
