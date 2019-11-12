import React from 'react';
import { MapView } from 'expo';

import { Container, Content, Header, Left, Body, Right, Icon, Title, Spinner, Text } from 'native-base';

export default class ShowMap extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    const { params } = this.props.navigation.state;
    const latitude = params ? params.latitude : null;
    const longitude = params ? params.longitude : null;
    console.log(`${latitude} ${longitude}`);
    if (!(latitude && longitude)) {
      return (
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Spinner color='blue' />
          <Text style={{ fontSize: 20 }}> Loading ...</Text>
        </Container>
      );
    }
        return (
          <Container style={{ backgroundColor: 'white' }}>
            <Icon name="arrow-back" style={{ color: 'black' }} onPress={() => this.props.navigation.goBack()} />
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  latitude: parseFloat(latitude),
                  longitude: parseFloat(longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
          </Container>
        );
  }
}
