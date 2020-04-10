import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Title,
  Text,
  Button,
  Icon,
  CheckBox,
  ListItem,
  Body,
  Header,
  Left,
  Right,
} from "native-base";
import { TextInput } from "react-native";
import DateComponent_2 from "./DateComponent";
import { ToggeleReportStatus } from "../actions/Old_Report";

class OldReport extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    old_report: false,
    request_to_admin: false,
    comment: "",
    date: "",
  };

  updateDate = (date) => {
    this.setState({ date });
  };

  oldReportUpdate() {
    if (this.state.old_report && this.state.request_to_admin) {
      this.props.ToggeleReportStatus(
        "old_report",
        this.state.date,
        this.state.comment
      );
      alert("Report Status Set.");
    } else {
      alert("Please tick above fields");
    }
  }

  render() {
    if (this.props.reduxState.reports.status === "old_report") {
      return (
        <Container>
          <Header style={{ backgroundColor: "blue" }}>
            <Left>
              <Icon
                name="arrow-back"
                style={{ color: "white" }}
                onPress={() => this.props.navigation.goBack()}
              />
            </Left>
            <Body>
              <Title style={{ marginLeft: 5 }}>Report Status</Title>
            </Body>
            <Right />
          </Header>
          <Content
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              padding: 50,
            }}
          >
            <Text style={{ fontSize: 20 }}>Report Status: Old Report</Text>
            <Button
              style={{
                backgroundColor: "red",
                width: 200,
                justifyContent: "center",
                margin: 20,
              }}
              onPress={() => this.props.ToggeleReportStatus()}
            >
              <Text style={{ fontSize: 20 }}>Clear</Text>
            </Button>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <Icon
              name="arrow-back"
              style={{ color: "white" }}
              onPress={() => this.props.navigation.goBack()}
            />
          </Left>
          <Body>
            <Text style={{ fontSize: 20, color: "white" }}>
              {" "}
              Report Information
            </Text>
          </Body>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            padding: 30,
            backgroundColor: "white",
          }}
        >
          <ListItem>
            <CheckBox
              checked={this.state.old_report}
              onPress={() =>
                this.setState({ old_report: !this.state.old_report })
              }
            />
            <Body>
              <Text style={{ fontSize: 20 }}>Old Report</Text>
            </Body>
          </ListItem>

          <ListItem>
            <CheckBox
              checked={this.state.request_to_admin}
              onPress={() =>
                this.setState({
                  request_to_admin: !this.state.request_to_admin,
                })
              }
            />
            <Body>
              <Text style={{ fontSize: 20 }}>Requesting to Admin</Text>
            </Body>
          </ListItem>

          <ListItem>
            <Body>
              <DateComponent_2 updateDate={this.updateDate} />
            </Body>
          </ListItem>

          <ListItem>
            <Body>
              <TextInput
                style={{ width: 280, height: 40, fontSize: 20 }}
                placeholder=" Any Comment "
                onChangeText={(comment) => this.setState({ comment })}
              />
            </Body>
          </ListItem>

          <ListItem>
            <Body style={{ flex: 1, justifyContent: "center" }}>
              <Button
                style={{ width: 200, justifyContent: "center" }}
                onPress={() => this.oldReportUpdate()}
              >
                <Text style={{ fontSize: 20 }}>Set Info</Text>
              </Button>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reduxState: state,
  };
}

export default connect(mapStateToProps, { ToggeleReportStatus })(OldReport);
