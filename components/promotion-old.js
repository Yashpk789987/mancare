
import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TextInput, Picker } from 'react-native';
import { updateFieldRecommendations } from '../actions';

class DailyFieldActivityReportComponentBrands extends React.Component {

  state = {
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: ""
  }

  updateFieldRecommendations() {

    let arr = [
      this.state.first,
      this.state.second,
      this.state.third,
      this.state.fourth,
      this.state.fifth,
      this.state.sixth
    ];

    this.props.updateFieldRecommendations(
      this.props.id,
      arr
    );
  }

  render() {

    return (
        <View style={styles.inputs}>
          <TextInput
            style={{width: 50, paddingLeft: 10, paddingRight: 10}}
            placeholder="1"
            onChangeText={(first) => {
              this.setState({first});
              this.updateFieldRecommendations() }}
          />
          <TextInput
            style={{width: 50, paddingLeft: 10, paddingRight: 10}}
            placeholder="2"
            onChangeText={(second) => {
              this.setState({second});
              this.updateFieldRecommendations() }}
          />
          <TextInput
            style={{width: 50, paddingLeft: 10, paddingRight: 10}}
            placeholder="3"
            onChangeText={(third) => {
              this.setState({third});
              this.updateFieldRecommendations() }}
          />
          <TextInput
            style={{width: 50, paddingLeft: 10, paddingRight: 10}}
            placeholder="4"
            onChangeText={(fourth) => {
              this.setState({fourth});
              this.updateFieldRecommendations() }}
          />
        <TextInput
            style={{width: 50, paddingLeft: 10, paddingRight: 10}}
            placeholder="5"
            onChangeText={(fifth) => {
              this.setState({fifth});
              this.updateFieldRecommendations() }}
          />
          <TextInput
            style={{width: 50, paddingLeft: 10, paddingRight: 10}}
            placeholder="6"
            onChangeText={(sixth) => {
              this.setState({sixth});
              this.updateFieldRecommendations() }}
          />
        </View>
    );
  }


}

const styles = StyleSheet.create({
  inputs: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  }
});

function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect( mapStateToProps , { updateFieldRecommendations } )(DailyFieldActivityReportComponentBrands);
