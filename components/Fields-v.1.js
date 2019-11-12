import React from 'react';
import { connect } from 'react-redux';

import { newField } from '../actions';
import { Container, Header, Title, Body, Content, Button } from 'native-base';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'

import DailyFieldActivityReportComponentPickers from './DailyFieldActivityReportComponentPickers';
import DailyFieldActivityReportComponentBrands from './DailyFieldActivityReportComponentBrands';

import DateComponent from './DateComponent'

import { submitFields, addNewReport } from '../actions/FieldSubmit'

class Fields extends React.Component {

  componentDidMount() {
    var d = new Date()
    this.setState({ date: d.toLocaleDateString(), submittionDate: d.toLocaleDateString() });
  }

  constructor(props) {
   super(props);

   this.state = {
      count: 0,
      data: [],
      submittionDate: "",
      date: "",
   }
}

  submitFeilds() {
    let arr = this.props.reduxState.fields.data;
    let username = this.props.reduxState.username;
    let urlParams = "?employee_username="+username+"&count="+arr.length+"&report_date="+this.state.date+"&submittion_date="+this.state.submittionDate;
    for( let i=0; i< arr.length; i++) {
      urlParams += "&doctor"+i+"="+arr[i].doctor+"&chemist"+i+"="+arr[i].chemist+"&"+i+"rec1="+arr[i].recommendation[0]+"&"+i+"rec2="+arr[i].recommendation[1]+"&"+i+"rec3="+arr[i].recommendation[2]+"&"+i+"rec4="+arr[i].recommendation[3]+"&"+i+"rec5="+arr[i].recommendation[4]+"&"+i+"rec6="+arr[i].recommendation[5];
    }
    console.log(urlParams)
    this.props.submitFields(urlParams);
  }

  changeDate(date) {
    this.setState({date});
  }

  addNewField() {
    let temp = { id: this.state.count + 1 };
    this.props.newField(this.state.count);
    this.setState( { data: [...this.state.data, temp], count: this.state.count + 1} );
  }

  showFields() {
    return this.state.data.map((item, index) =>
      (<View View style={{ height: 100, paddingTop: 10}} key={index}>
          <DailyFieldActivityReportComponentPickers id={index} />
          <DailyFieldActivityReportComponentBrands id={index} />
      </View>)
    )
  }

  addNewReport() {
    this.setState({data: []})
    this.props.addNewReport();
  }

  status() {
    if(this.props.reduxState.fields.fieldMsg == 'Already Reported Once') {
      return (
        <View style={{ padding: 20, alignItems: 'center'}}>
          <Text style={{ fontSize: 23, color: 'red' }}>
            You have already reported once. Cannot Insert Again. Sorry.
          </Text>
          <Text style={{ fontSize: 20 }}>
            Report Submitted On: {this.props.reduxState.fields.onErrorSubmittionDateMsg}
          </Text>
          <Button bordered danger
            onPress={() => this.props.navigationProp.navigate('MainPage')}
            style={{  marginTop: 70, width: 150, justifyContent: 'center'
          }}>
            <Text style={{ fontSize: 22, color: 'red' }}>Go Back</Text>
          </Button>
        </View>

      );
    }else {
      return (
        <View style={{ padding: 20, alignItems: 'center'}}>
          <Text style={{ fontSize: 23, color: 'green' }}>
            Record Submitted Successfully.
          </Text>
          <Text style={{ fontSize: 20 }}>
            Report Submitted On: {this.state.submittionDate}
          </Text>
          <Button bordered
            onPress={() => this.addNewReport()}
            style={{  marginTop: 70, width: 150, justifyContent: 'center' }}>
            <Text style={{ fontSize: 22, color: 'blue' }}>New Report</Text>
          </Button>
        </View>
      );
    }
  }


  render() {
    if(this.props.reduxState.fields.submitted === true ) {
      return(<View style={{ flex: 1,  padding: 30}}>

              <Text style={{ fontSize: 20, marginTop: 50, marginLeft: 20 }}>
                Username : {this.props.reduxState.username}
              </Text>

              <Text style={{ fontSize: 20, marginLeft: 20 }}>
                Welcome, {this.props.reduxState.name}
              </Text>

              <Text style={{ fontSize: 20, marginLeft: 20 }}>
                Report Date: {this.state.date}
              </Text>

              {this.status()}

            </View>);
    } else {
      return (
        <Container style={{ flex: 1, backgroundColor: 'white' }}>
          <Header>
            <Body><Title style={{ marginLeft: 20}}>Daily Field Actitivity Report</Title></Body>
          </Header>
          <Content>
            <Text style={{ fontSize: 18, margin: 10, marginBottom: 20 }}>
              Welcome,  <Text style={{ fontSize: 20 }}> {this.props.reduxState.name}</Text>
            </Text>
            <DateComponent changeDate={(date) => this.changeDate(date)} />
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() =>  this.addNewField()}>
                <Text style={{ marginLeft: 50, marginRight: 50, marginTop: 20, fontSize: 20 }}>+ Add New Field</Text>
              </TouchableOpacity>
              <Button bordered
                onPress={() => this.submitFeilds()}
                style={{  marginTop: 20, width: 100, justifyContent: 'center'
              }}>
                <Text style={{ fontSize: 22, color: 'blue' }}>Submit</Text>
              </Button>
            </View>
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}>
              {this.showFields()}
            </KeyboardAvoidingView>
          </Content>
        </Container>
      );
    }

  }
}

function mapStateToProps(state) {
  return {
    reduxState: state
  }
}

export default connect( mapStateToProps , { newField, submitFields, addNewReport } )(Fields);
