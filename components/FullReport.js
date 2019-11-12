import React from 'react';
import { connect } from 'react-redux';

import { View, TouchableOpacity } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Spinner, Body, Button, Icon } from 'native-base';

import { allowOldeport } from '../actions/Old_Report'

class FullReport extends React.Component {

  state = {
    report_id: '',
    allowButton: ''
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;
    const allowButton = params ? params.allowButton : null;
    const report_id = params ? params.report_id : null;
    this.setState({ report_id, allowButton })

  }
  static navigationOptions = {
    header: null
  }

  showAllowButton(allowButton) {
    if(this.state.allowButton) {
      return (
        <Button
          full info
          onPress={() => this.props.allowOldeport(this.state.report_id)}
          style={{ margin: 10 }}
        >
          <Text style={{ fontSize: 20, color: 'white'}}>Allow this Report</Text>
        </Button>
      )
    }
  }

  showMap(latitude, longitude) {
    this.props.navigation.navigate('ShowMap',{
      latitude, longitude
    });
  }

  render() {
    if(this.state.allowButton && this.props.reduxState.leavePage == 'yes') {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center'
          }}>
          <Text style={{ fontSize: 20 }}> Report has been removed.</Text>
          <Text style={{ fontSize: 18 }}> Please Go Back.</Text>
          <Button info
            onPress={() => this.props.navigation.goBack()}
          >
            <Text>Go Back</Text>
          </Button>
        </View>
      )
    }
    if(this.props.reduxState.reports.isSelectedReportFetched != true) {
      return(
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            alignItems: 'center'
          }}>
          <Spinner color="blue" />
          <Text style={{ fontSize: 20 }}> Loading .... </Text>
        </View>
      )
    } else if (this.props.reduxState.leavePage == ' yes') {
      return (
        <Container>
          <Content>
            <Text style={{ fontSize: 20 }}> This report has been allowed.</Text>
          </Content>
        </Container>
      )
    } else {
      return(
      <Container style={{ backgroundColor: 'white',}}>
        <Content>
          {this.showAllowButton(this.state.allowButton)}

          <List dataArray={this.props.reduxState.reports.selectedReport}
            renderRow={(item) =>
              <ListItem>
                <Body>
                  <Text>Doctor:  {item.doctor}</Text>
                  <Text>Chemist:  {item.chemist}</Text>
                  <Text>
                    promoted :
                     {item.promoted}
                  </Text>
                  <Text>Remark:  {item.remark}</Text>
                </Body>
                <TouchableOpacity
                    onPress={() => this.showMap(item.latitude, item.longitude)}
                >
                  <Icon name="navigate" />
                </TouchableOpacity>
              </ListItem>
            }>
          </List>
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

export default connect(mapStateToProps , { allowOldeport })(FullReport);
