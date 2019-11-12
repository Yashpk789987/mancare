import React from 'react';

import { createStackNavigator } from 'react-navigation';

import DisplayReports from './DisplayReports'
import FullReport from './FullReport'
import DisplayOldReports from './DisplayOldReports'
import ShowMap from './ShowMap'


const MainNavigator = createStackNavigator({
  DisplayReports: { screen: DisplayReports },
  FullReport: { screen: FullReport },
  DisplayOldReports: { screen: DisplayOldReports },
  ShowMap: { screen: ShowMap },
});


export default class ReportsNavigator extends React.Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return(
      <MainNavigator />
    );
  }

}
