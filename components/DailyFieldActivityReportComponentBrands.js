import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';
import { updateFieldRecommendations } from '../actions';

class DailyFieldActivityReportComponentBrands extends React.Component {

  updateFieldRecommendations(promoted) {
    this.props.updateFieldRecommendations(
      this.props.id, promoted
    );
  }

  render() {

    return (
          <TextInput
            style={{ width: 300, height: 40, marginLeft: 40, marginRight: 10, fontSize: 20 }}
            placeholder=" Brand Promoted"
            onChangeText={promoted =>  this.updateFieldRecommendations(promoted) }
          />

    );
  }

}

function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect( mapStateToProps , { updateFieldRecommendations } )(DailyFieldActivityReportComponentBrands);
