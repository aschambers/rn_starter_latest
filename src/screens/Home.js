import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
      width: SCREEN_WIDTH
    }
  }

  constructor(props) {
    super(props);

  }

  loginAction() {
    this.props.navigation.navigate('Login');
  }

  signupAction() {
    this.props.navigation.navigate('Signup');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/subfeader.png')} style={styles.logoStyle} height={180} width={180} />
        <Text style={styles.textStyle}>Subscribe to RSS Feeds and get a notification when any of them update!</Text>
        <TouchableOpacity
          onPress={() => this.loginAction()}
          title="Log In"
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.signupAction()}
          title="Sign Up"
        >
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logoStyle: {
    marginTop: SCREEN_HEIGHT * 0.15,
  },
  textStyle: {
    width: SCREEN_WIDTH * 0.6,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 30,
    color: '#000',
  },
  loginText: {
    color: '#6F9ED4',
    fontWeight: 'bold',
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.3,
    height: 40,
    textAlign: 'center',
    borderRadius: 7,
    paddingTop: 8,
    marginTop: 40,
  },
  signupText: {
    color: '#6F9ED4',
    fontWeight: 'bold',
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 1,
    width: SCREEN_WIDTH * 0.3,
    height: 40,
    textAlign: 'center',
    borderRadius: 7,
    paddingTop: 8,
    marginTop: 20,
  }
});

export default connect(null, actions)(Home);