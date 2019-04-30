import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Loader from '../components/Loading';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';
import * as actions from '../redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Login extends Component {
  static navigationOptions = {
    title: 'Login',
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      alignSelf: 'center',
      width: SCREEN_WIDTH,
    },
    headerRight: (<View />)
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isLoading: false,
      error: '',
    }
  }

  componentDidMount() {
    this.props.resetFeedValues();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.error) {
      Toast.showWithGravity("Something went wrong.. please try again in a few minutes",Toast.SHORT,Toast.CENTER);
    } else if(nextProps.success) {
      Keyboard.dismiss();
      this.setState({ error: "" });
      this.props.navigation.navigate('Dashboard');
    }
  }

  loginUser = async() => {
    const { username, password } = this.state;
    if(!username || !password) {
      Toast.showWithGravity("Username and password are required",Toast.SHORT,Toast.CENTER);
    }
    let params = {
      username: this.state.username,
      password: this.state.password,
      os: Platform.OS,
    }

    this.props.userLogin(params);
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />
    }

    return (
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            underlineColorAndroid="black"
            placeholder="Username"
            placeholderTextColor="black"
            inputContainerStyle={styles.formInput}
            value={this.state.username}
            autoCapitalize="none"
            onChangeText={username => this.setState({ username })}
          />
          <Input
            underlineColorAndroid="black"
            placeholder="Password"
            placeholderTextColor="black"
            inputContainerStyle={styles.formInput}
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <Button
          onPress={this.loginUser}
          buttonStyle={styles.buttonStyle}
          title="Login"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputContainer: {
    justifyContent: 'center',
  },
  formInput: {
    marginTop: 8,
    width: SCREEN_WIDTH * 0.5
  },
  buttonStyle: {
    marginTop: 12,
    backgroundColor: '#323232',
    width: SCREEN_WIDTH * 0.5,
    borderRadius: 2,
  },
  errorStyle: {
    marginTop: 10,
  }
});

function mapStateToProps(state) {
  return {
    success: state.authReducer.success,
    isLoading: state.authReducer.isLoading,
    error: state.authReducer.error,
  }
}

export default connect(mapStateToProps, actions)(Login);