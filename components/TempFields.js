import React from 'react';

import { StackNavigator } from 'react-navigation';

import Report from './Report'
import OldReport from './OldReport';

const Navigator = StackNavigator({
  Report: { screen: Report },
  OldReport: { screen: OldReport }
});

export default class Fields extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return(
      <Navigator />
    )
  }
}
