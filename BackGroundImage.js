import React from 'react';
import { ImageBackground, View, Image, Touchableopacity } from 'react-native';

export default class BackGroundImage extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <ImageBackground
          source={require('./assets/bg.jpg')}
          style={{ flex: 1,
            width: null,
            height: null,
            }}
      >
       <View
         style={{
         flex: 1,
         alignItems: 'center',
         justifyContent: 'space-around',
         flexDirection: 'row' }}
       >
         <Touchableopacity onPress={() => this.props.navigation.navigate('')}>
           <Image
             source={require('./assets/admin.png')}
           />
         </Touchableopacity>

        <Image
          source={require('./assets/user.png')}
        />
       </View>
     </ImageBackground>
    );
  }
}
