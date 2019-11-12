import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { fetchFields, fetchReport } from '../actions/FetchFields'
import DateComponent from './DateComponent'
import { View } from 'react-native'
import DisplayOldReports from './DisplayOldReports'

class DisplayReports extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      date : ''
    }
  }


  componentWillMount() {
    let today = new Date();
    this.setState({ date: today.toLocaleDateString()})
    this.props.fetchFields(today.toLocaleDateString());
  }

  static navigationOptions = {
    header: null
  }

  seeReport(report_id, id) {
    this.props.fetchReport(report_id);
    this.props.navigation.navigate('FullReport',{  report_id: report_id });
  }
  makeList() {
    return this.props.reduxState.reports.data.map( item =>
              <ListItem key={item.id}>
                <Body>
                  <Text>{item.name}</Text>
                  <Text note>report date: {item.date}</Text>
                </Body>
                <Right>
                  <Button
                    bordered
                    onPress={() => this.seeReport(item.report_id, item.id)}
                    >
                    <Text>See</Text>
                  </Button>
                </Right>
              </ListItem>
    )}

  updateDate = (date) => {
    this.setState({date});
    this.props.fetchFields(date);
  }

  render() {
    return(
      <Container style={{ backgroundColor: 'white'}}>
        <Content>
          <View style={{ flexDirection: 'row' }}>
            <DateComponent updateDate={this.updateDate}/>
            <Button bordered
              style={{ backgroundColor: 'red', marginLeft: 20}}
              onPress={() => this.props.navigation.navigate('DisplayOldReports')}
             >
               <Text style={{ color: 'white'}}>Old Reports</Text>
             </Button>
          </View>

          <List>
            {this.makeList()}
          </List>
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

export default connect(mapStateToProps , { fetchFields, fetchReport } )(DisplayReports);
