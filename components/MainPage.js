import React from "react";
import { View, Image, TouchableOpacity, ImageBackground } from "react-native";

import { connect } from "react-redux";

import { chooseProfileType } from "../actions";

class MainPage extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onAdminPress() {
    this.props.chooseProfileType("admin");
    this.props.navigation.navigate("AdminLogin");
  }

  onEmployeePress() {
    this.props.chooseProfileType("employee");
    this.props.navigation.navigate("EmployeeLogin");
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/bg.jpg")}
        style={{ flex: 1, width: null, height: null }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => this.onAdminPress()}>
            <Image source={require("../assets/admin.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onEmployeePress()}>
            <Image source={require("../assets/user.png")} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    reduxState: state,
  };
}

export default connect(mapStateToProps, { chooseProfileType })(MainPage);
