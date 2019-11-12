import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, KeyboardAvoidingView, Picker} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Left, Body, Right, Title, Thumbnail } from 'native-base';

import { AddDoctors } from '../actions/AdminTab'

 class AddDoctor extends React.Component {

   static navigationOptions = {
     header: null
   }

   state = {
    name: "",
    address: "",
    stateid: "",
    cityid: "",
    email: "",
    mobileno: "",
    cities: [],
   }

   addNewDoctor() {
    if(this.state.name != "" && this.state.address != "" && this.state.stateid != "" && this.state.cityid != "" && this.state.email != "" && this.state.mobileno != "" ) {
      this.props.AddDoctors(
        this.state,
        "/mancare/index.php/DoctorController/insert"
      )
    }else {
      alert('Please fill all the fields');
    }
   }

   fillStatesOptions() {
     return this.props.reduxState.state.states.map((item,index) =>
       <Picker.Item label={item.state} value={item.stateid} key={index}/>
   )}

   fillCityArray(stateid) {
     this.setState({cities: this.props.reduxState.city.cities.filter(city => city.stateid+"" == stateid)})
   }

  fillCitiesOptions() {
   return this.state.cities.map(city =>
     <Picker.Item label={city.city} value={city.cityid} key={city.cityid} />
  )}

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: "center", backgroundColor: "white"}}>

          <Container style={{ flex: 8}}>
            <Content>
              <Form>

                <Item floatingLabel>
                  <Label  style={{fontSize: 17, color: "black", marginTop: 5}}> <Icon ios="ios-person" name="person" style={{ fontSize: 20 }}/>   Name   </Label>
                  <Input onChangeText={(name) => this.setState({name})} />
                </Item>


                <Item floatingLabel>
                  <Label style={{fontSize: 17,color: "black", marginTop: 5}}> <Icon ios="ios-mail" name="mail" style={{ fontSize: 20 }}/>  Email</Label>
                  <Input onChangeText={email =>this.setState({email})} keyboardType='email-address'  />
                </Item>

                <Item floatingLabel>
                  <Label  style={{fontSize: 17,color: "black", marginTop: 5}}> <Icon ios="ios-phone-portrait" name="phone-portrait" style={{ fontSize: 20 }} />  Phone</Label>
                  <Input onChangeText={mobileno => this.setState({mobileno})} keyboardType='phone-pad'/>
                </Item>

                <Item floatingLabel>
                  <Label  style={{fontSize: 17,color: "black"}}>  <Icon ios="ios-lock" name="home" style={{ fontSize: 20 }} />  Address</Label>
                  <Input onChangeText={address => this.setState({address})} blurOnSubmit/>
                </Item>

                <Picker
                  style={{ marginLeft: 15, marginTop: 5 }}
                   selectedValue={this.state.stateid}
                   onValueChange={(stateid, itemIndex) => {
                     this.setState({stateid})
                     this.fillCityArray(stateid);
                   }}>
                   <Picker.Item label="Choose a State" value="" />
                   {this.fillStatesOptions()}
                </Picker>

                <Picker
                  style={{ marginTop: 15, marginLeft: 18}}
                   selectedValue={this.state.cityid}
                   onValueChange={(cityid, itemIndex) => this.setState({cityid}) }>
                   <Picker.Item label="Choose a City" value="" />
                   {this.fillCitiesOptions()}
                </Picker>

                <Button primary rounded onPress={() => this.addNewDoctor()} style={{ width: 150, marginTop: 10, marginLeft: 100, justifyContent: 'center'}}>
                  <Text style={{ fontSize: 20, color: 'white' }}>Add Docor</Text>
                </Button>
                <Text style={{ fontSize: 24, marginLeft: 10, marginTop: 5}}>
                  {this.props.reduxState.doctor.doctorMsg}
                </Text>
              </Form>
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

export default connect(mapStateToProps , {AddDoctors} )(AddDoctor);
