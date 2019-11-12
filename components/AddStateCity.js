import React from 'react'
import { connect } from 'react-redux';

import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Picker } from 'react-native'
import { Button, Container, Content } from 'native-base'

import { AddState, AddCity, getStates, getCities } from '../actions/AdminTab';

class AddStateCity extends React.Component {

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    this.props.getStates();
    this.props.getCities();
  }

  state = {
    state: "",
    city: "",
    stateid: "",
  }

  addNewState() {
    if(this.state.state != "") {
      this.props.AddState(
        this.state.state,
        "/mancare/index.php/StateController/insert"
      );
    }
  }

  addNewCity() {
    if(this.state.stateid != "" && this.state.city != "") {
      this.props.AddCity(
        this.state.city,
        this.state.stateid,
        "/mancare/index.php/CityController/insert"
      );
    }else {
      alert('Please Enter a city and choose a state')
    }
  }

  fillStatesOptions() {
    return this.props.reduxState.state.states.map((item,index) =>
      <Picker.Item label={item.state} value={item.stateid} key={index}/>
  )}

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: 'white', padding: 30 }}>
        <Container>
          <Content>
            <Text style={{ fontSize: 25, marginTop: 5 }}>Add New State </Text>
            <TextInput
              placeholder="Enter the State Here"
              onChangeText={(state) => this.setState({state}) }
              style={{ fontSize: 25, color: 'black', marginTop: 20 }}
            />
            <Button primary rounded onPress={() => this.addNewState()} style={{ width: 150, marginTop: 10, justifyContent: 'center'}}>
              <Text style={{ fontSize: 20, color: 'white' }}>Add State</Text>
            </Button>
            <Text style={{ color: 'red', fontSize: 15}}>{this.props.reduxState.state.stateMsg}</Text>


            <Text style={{ fontSize: 25, marginTop: 50 }}>Add New City </Text>
            <Picker
               selectedValue={this.state.stateid}
               onValueChange={(stateid, itemIndex) => this.setState({stateid}) }>
               <Picker.Item label="Choose a State" value="" />
               {this.fillStatesOptions()}
            </Picker>
            <Text>{this.stateid}</Text>
            <TextInput
              placeholder="Enter the City Here"
              onChangeText={(city) => this.setState({city}) }
              style={{ fontSize: 25, color: 'black', marginTop: 20 }}
            />
            <Button primary rounded onPress={() => this.addNewCity()} style={{ width: 150, marginTop: 10, justifyContent: 'center'}}>
              <Text style={{ fontSize: 20, color: 'white' }}>Add City</Text>
            </Button>
            <Text style={{ color: 'red', fontSize: 15}}>{this.props.reduxState.city.cityMsg}</Text>
          </Content>
        </Container>
      </KeyboardAvoidingView>
    );
  }

}

function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps, { AddState, AddCity, getStates, getCities })(AddStateCity);
