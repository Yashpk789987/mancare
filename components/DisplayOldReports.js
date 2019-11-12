import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button } from 'native-base';
import { fetchOldFields, fetchReport } from '../actions/FetchFields'
import DateComponent from './DateComponent'
import { View } from 'react-native'

class DisplayOldReports extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      date : ''
    }
  }


  componentWillMount() {
    let today = new Date();
    this.setState({ date: today.toLocaleDateString()})
    this.props.fetchOldFields(today.toLocaleDateString());
  }

  static navigationOptions = {
    header: null
  }

  seeReport(report_id, id) {
    this.props.fetchReport(report_id);
    this.props.navigation.navigate('FullReport', { allowButton: true, report_id });
  }

  makeList() {
    return this.props.reduxState.reports.oldData.map( item =>
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
    this.props.fetchOldFields(date);
  }

  render() {
    return(
      <Container style={{ backgroundColor: 'white'}}>
        <Content>
          <View style={{marginLeft: 50 }}>
            <DateComponent updateDate={this.updateDate}/>
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

export default connect(mapStateToProps , { fetchOldFields, fetchReport } )(DisplayOldReports);
