import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, View, KeyboardAvoidingView, Picker} from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Button, Icon, Left, Body, Right, Title, Thumbnail } from 'native-base';



 class AddChemist extends React.Component {

   static navigationOptions = {
     header: null
   }

   state = {
     doctorid: "",
     name: "",
     email: "",
     mobileno: "",
   }

   addNewChemist() {
     
   }


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
                  <Input onChangeText={email => this.checkEmail(email)} keyboardType='email-address'  />
                </Item>

                <Item floatingLabel>
                  <Label  style={{fontSize: 17,color: "black", marginTop: 5}}> <Icon ios="ios-phone-portrait" name="phone-portrait" style={{ fontSize: 20 }} />  Phone</Label>
                  <Input onChangeText={mobileno => this.setState({mobileno})} keyboardType='phone-pad'/>
                </Item>

                <Picker
                  style={{ marginTop: 15, marginLeft: 18}}
                   selectedValue={this.state.doctorid}
                   onValueChange={(doctorid, itemIndex) => this.setState({doctorid}) }>
                   <Picker.Item label="Choose a Doctor" value="" />
                   <Picker.Item label="Dr A" value="1" />
                   <Picker.Item label="Dr Button" value="2" />
                </Picker>



                <Button primary rounded onPress={() => this.addNewChemist()} style={{ width: 150, marginTop: 10, marginLeft: 100, justifyContent: 'center'}}>
                  <Text style={{ fontSize: 20, color: 'white' }}>Add Chemist</Text>
                </Button>

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

export default connect(mapStateToProps , null)(AddChemist);
