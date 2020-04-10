import React from "react";
import { connect } from "react-redux";

import { Text, View } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Title,
  Spinner,
} from "native-base";

import { doLogIn } from "../actions/Signing";
import { ToggeleReportStatus } from "../actions/Old_Report";
import Report from "./Report";

class EmployeeLogin extends React.Component {
  componentDidMount() {
    this.props.ToggeleReportStatus();
  }
  static navigationOptions = {
    header: null,
  };

  state = {
    username: "",
    password: "",
    usernameMsg: "",
    passwordMsg: "",
    dirty: false,
  };

  logIn() {
    if (this.state.username !== "" && this.state.password !== "") {
      this.props.doLogIn(
        this.state.username,
        this.state.password,
        "/index.php/employeesctrl/checklogin"
      );
      this.setState({ dirty: true });
    } else if (this.state.username === "" && this.state.password === "") {
      this.setState({
        usernameMsg: "Please Enter Your Username ",
        passwordMsg: "Please Enter Your Password ",
      });
    } else if (this.state.password === "") {
      this.setState({ passwordMsg: "Please Enter Your Password " });
    } else {
      this.setState({ usernameMsg: "Please Enter Your Username " });
    }
  }

  render() {
    if (this.props.reduxState.islogin === true) {
      return <Report navigationProp={this.props.navigation} />;
    } else if (this.props.reduxState.doing_login === true) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner color="blue" />
          <Text style={{ fontSize: 20 }}> Loading ...</Text>
        </View>
      );
    }
    return (
      <Container style={{ flex: 1, justifyContent: "center" }}>
        <Header Color="blue">
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("MainPage")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ width: "120%" }}>
            <Title style={{ textAlign: "left", color: "white" }}>
              Employee Login
            </Title>
          </Body>
        </Header>

        <View style={{ flex: 1, marginTop: 5 }}>
          <Form style={{ padding: 20 }}>
            <Item>
              <Icon ios="ios-person" name="person" style={{ fontSize: 20 }} />
              <Input
                placeholder="Username"
                onChangeText={(username) =>
                  this.setState({ username, usernameMsg: "" })
                }
              />
            </Item>
            <Text style={{ color: "red", marginLeft: 19, fontSize: 15 }}>
              {this.state.usernameMsg}
            </Text>
            <Item>
              <Icon ios="ios-lock" name="lock" style={{ fontSize: 20 }} />
              <Input
                placeholder="Password"
                onChangeText={(password) =>
                  this.setState({ password, passwordMsg: "" })
                }
                blurOnSubmit={true}
              />
            </Item>
            <Text style={{ color: "red", marginLeft: 19, fontSize: 15 }}>
              {this.state.passwordMsg}
            </Text>
          </Form>
        </View>
        <Container
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Content>
            <Button
              style={{ width: "100%", justifyContent: "center", marginTop: 30 }}
              onPress={(e) => this.logIn(e)}
            >
              <Text style={{ fontSize: 20, color: "white" }}>Log In </Text>
            </Button>
            <View style={{ marginTop: 30 }}></View>
          </Content>
        </Container>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    reduxState: state,
  };
}

export default connect(mapStateToProps, { doLogIn, ToggeleReportStatus })(
  EmployeeLogin
);
