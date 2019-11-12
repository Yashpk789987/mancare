import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, KeyboardAvoidingView, Picker} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Left, Body, Right, Title, Thumbnail } from 'native-base';

import { AddEmployees } from '../actions/AdminTab'

 class AddEmployee extends React.Component {

   static navigationOptions = {
     header: null
   }

   state = {
     name: "",
     email: "",
     mobileno: "",
     address: "",
     password: "",
     username: ""
   }

   addNewEmployee() {
     let urlFunction = '/index.php/employeesctrl/insert';
     if(this.state.name != "" && this.state.email != "" && this.state.mobileno != "" && this.state.address != "" && this.state.password != "" && this.state.username != "" ) {
       this.props.AddEmployees(
         this.state,
         urlFunction
       );
     } else {
       alert('Please fill all fields');
     }
   }


  render() {
    return (
        <Container style={{ backgroundColor: 'white' }}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label  style={{fontSize: 17, color: "black", marginTop: 5}}> <Icon ios="ios-person" name="person" style={{ fontSize: 20 }}/>   Name   </Label>
                <Input onChangeText={(name) => this.setState({name})} />
              </Item>

              <Item floatingLabel>
                <Label style={{fontSize: 17,color: "black", marginTop: 5}}> <Icon ios="ios-mail" name="mail" style={{ fontSize: 20 }}/>  Email</Label>
                <Input onChangeText={email => this.setState({email}) }  keyboardType='email-address'  />
              </Item>

              <Item floatingLabel>
                <Label  style={{fontSize: 17,color: "black", marginTop: 5}}> <Icon ios="ios-phone-portrait" name="phone-portrait" style={{ fontSize: 20 }} />  Phone</Label>
                <Input onChangeText={mobileno => this.setState({mobileno})} keyboardType='phone-pad'/>
              </Item>

              <Item floatingLabel>
                <Label  style={{fontSize: 17,color: "black", marginTop: 5}}> <Icon  name="flag" style={{ fontSize: 20 }} />  Address</Label>
                <Input onChangeText={address => this.setState({address})} />
              </Item>

              <Item floatingLabel>
                <Label  style={{fontSize: 17, color: "black", marginTop: 5}}> <Icon ios="ios-key" name="key" style={{ fontSize: 20 }}/>   username   </Label>
                <Input onChangeText={(username) => this.setState({username})} />
              </Item>

              <Item floatingLabel>
                <Label  style={{fontSize: 17,color: "black"}}>  <Icon ios="ios-lock" name="lock" style={{ fontSize: 20 }} />  Password</Label>
                <Input onChangeText={password => this.setState({password})} blurOnSubmit />
              </Item>

              <Button primary rounded onPress={() => this.addNewEmployee()} style={{ width: 200, marginTop: 30, marginLeft: 80, justifyContent: 'center'}}>
                <Text style={{ fontSize: 20, color: 'white' }}>Add Employee </Text>
              </Button>

              <Text style={{ fontSize: 20, marginLeft: 20 }} > {this.props.reduxState.employee.employeeMsg}</Text>

          </Form>
         </Content>
        </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect(mapStateToProps , { AddEmployees })(AddEmployee);
