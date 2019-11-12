import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TextInput } from 'react-native';
import { updateFieldPickers } from '../actions';

class DailyFieldActivityReportComponentPickers extends React.Component {

  state = {
    doctor: "",
    chemist: "",
  }

  onValueChange(doctor, chemist) {
    this.setState({ doctor, chemist })
    this.props.updateFieldPickers(
      this.props.id,
      doctor, chemist
    );

  }


  render() {
    return (
        <View style={styles.pickers}>
          <Text style={{ fontSize: 20}}>{this.props.id +1}. </Text>
          <TextInput
            style={{width: 150, height: 40, fontSize: 20}}
            placeholder=" Doctor Name"
            onChangeText={(doctor) => this.onValueChange(doctor,this.state.chemist) }
          />
        <TextInput
          style={{width: 150, height: 40, fontSize: 20}}
          placeholder=" Chemist Name"
          onChangeText={(chemist) => this.onValueChange(this.state.doctor, chemist) }
        />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  pickers: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});


function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect( mapStateToProps , { updateFieldPickers } )(DailyFieldActivityReportComponentPickers);
