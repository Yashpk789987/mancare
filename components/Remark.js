import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, TextInput } from 'react-native';
import { updateRemark } from '../actions/FieldSubmit'

class Remark extends React.Component {


  render() {
    return (
          <TextInput
            style={{ width: 300, height: 40, marginLeft: 40, marginRight: 10, fontSize: 20 }}
            placeholder=" Remark if any"
            onChangeText={remark => this.props.updateRemark(remark,this.props.id)}
          />
    );
  }
}

function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect( mapStateToProps , { updateRemark } )(Remark);
