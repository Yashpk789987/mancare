import * as Expo from 'expo';
import { Constants } from 'expo';
import React from 'react';
import { Provider } from 'react-redux';

import { createStackNavigator } from 'react-navigation';

import store from './ReduxStore';

import MainPage from './components/MainPage';
import EmployeeLogin from './components/EmployeeLogin';
import AdminLogin from './components/AdminLogin';
import Report from './components/Report';
import OldReport from './components/OldReport';

const MainNavigator = createStackNavigator({
  MainPage: { screen: MainPage },
  AdminLogin: { screen: AdminLogin },
  EmployeeLogin: { screen: EmployeeLogin },
  Fields: { screen: Report },
  Report: { screen: Report },
  OldReport: { screen: OldReport }
});

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  componentWillMount() {
    this.loadFonts();
   }

  async loadFonts() {
    await Expo.Font.loadAsync({
      Arial: require('native-base/Fonts/arial.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
    });
    this.setState({ isReady: true });
  }

  render() {
      if (!this.state.isReady) {
        return <Expo.AppLoading />;
      }
    return (
      <Provider store={store}>
          <MainNavigator />
      </Provider>
    );
  }
}
