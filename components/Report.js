import React from 'react';
import Expo, { Constants, Location, Permissions } from 'expo';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import { newField } from '../actions';
import { Container, Header, Title, Body, Content, Button, Right } from 'native-base';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'

import DailyFieldActivityReportComponentPickers from './DailyFieldActivityReportComponentPickers';
import DailyFieldActivityReportComponentBrands from './DailyFieldActivityReportComponentBrands';
import Remark from './Remark';

import { submitFields, addNewReport } from '../actions/FieldSubmit'

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, maximumAge: 1000 };



class Report extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
   super(props);

   this.state = {
      count: 0,
      data: [],
      location: null,
      errorMessage: null,
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    //Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync(GEOLOCATION_OPTIONS);

    this.setState({ location });
  };

  // locationChanged = (location) => {
  //   this.setState({location})
  // }

  submitFeilds() {
    let today = new Date();
    let todayDate = today.toLocaleDateString()
    const { latitude, longitude } = this.state.location.coords;
    const { status, old_date, old_date_comment } = this.props.reduxState.reports;
    let arr = this.props.reduxState.fields.data;
    let username = this.props.reduxState.username;
    let urlParams = "?date="+todayDate+"&status="+status+"&old_date="+old_date+"&old_date_comment="+old_date_comment+"&employee_username="+username+"&count="+arr.length+"&latitude="+latitude+"&longitude="+longitude;
    for( let i=0; i< arr.length; i++) {
      urlParams += "&doctor"+i+"="+arr[i].doctor+"&chemist"+i+"="+arr[i].chemist+"&promoted"+i+"="+arr[i].promoted+"&remark"+i+"="+arr[i].remark;
    }
    console.log(urlParams)
    this.props.submitFields(urlParams);
  }

  addNewField() {
    let temp = { id: this.state.count + 1 };
    this.props.newField(this.state.count);
    this.setState( { data: [...this.state.data, temp], count: this.state.count + 1} );
  }

  showFields() {
    return this.state.data.map((item, index) =>
      (<View View style={{ height: 140, paddingTop: 10}} key={index}>
          <DailyFieldActivityReportComponentPickers id={index} />
          <DailyFieldActivityReportComponentBrands id={index} />
          <Remark id={index} />
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

  reportStatus() {
    if(this.props.reduxState.reports.status == 'null') {
      return <Text>New Report</Text>
    }else {
      return <Text>Old Report</Text>
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
          <Header style={{ backgroundColor: 'blue'}}>
            <Body><Title style={{ marginLeft: 5 }}>Report</Title></Body>
            <Right>
              <Button bordered
                onPress={() => this.props.navigationProp.navigate('OldReport')}
                style={{ backgroundColor: 'blue', width: 120, }}
              >
                <Text style= {{ fontSize: 19, color: 'white' }}>Old Report</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Text style={{ fontSize: 18, margin: 10, marginBottom: 20 }}>
              Welcome,  <Text style={{ fontSize: 20 }}> {this.props.reduxState.name}</Text>
            </Text>
            <Text style={{ fontSize: 18, margin: 10, marginBottom: 20 }}>
              Report Status, {this.reportStatus()}
            </Text>
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

export default connect( mapStateToProps , { newField, submitFields, addNewReport } )(Report);
