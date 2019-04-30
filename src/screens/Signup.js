import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import Loader from '../components/Loading';
import Toast from 'react-native-simple-toast';
import validateEmailHelper from '../utils/validateEmailHelper';
import { connect } from 'react-redux';
import * as actions from '../redux';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      cellPhone: null,
      username: '',
      password: '',
      confirmPassword: '',
      error: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.signupError ? this.setState({ error: "Email or Username already in use" }) : this.setState({ error: "" });

    if(nextProps.signupSuccess) {
      this.setState({ firstName: '', lastName: '', email: '', cellPhone: null, username: '', password: '', confirmPassword: '' });
      Toast.showWithGravity("You signed up successfully, and may now login!",Toast.SHORT,Toast.CENTER);
      let reset = this.props.resetValues();
      if(reset) {
        this.props.navigation.navigate('Login');
      }
    }
  }

  createUser = () => {
    const { firstName, lastName, email, cellPhone, username, password, confirmPassword } = this.state;
    if(password !== confirmPassword) {
      Toast.showWithGravity("Passwords must match",Toast.SHORT,Toast.CENTER);
    } else if (!firstName || !lastName || !email || !cellPhone || !username || !password) {
      Toast.showWithGravity("All fields are required to signup",Toast.SHORT,Toast.CENTER);
    } else if(!validateEmailHelper.validateEmail(email)) {
      Toast.showWithGravity("Email must be valid in order to sign up",Toast.SHORT,Toast.CENTER);
    } else {
        let params = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          cellPhone: cellPhone,
          username: username,
          password: password,
          mobile: true,
        }
        this.props.userSignup(params);
    }
  }

  render() {
    if (this.state.signupIsLoading) {
      return <Loader />;
    }

    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.formContainer}>
          <View style={styles.inputContainerr}>
            <Input
              underlineColorAndroid="black"
              placeholder="First Name"
              placeholderTextColor="black"
              inputContainerStyle={styles.formInput}
              value={this.state.firstName}
              autoCapitalize="none"
              onChangeText={firstName => this.setState({ firstName })}
            />
            <Input
              underlineColorAndroid="black"
              placeholder="Last Name"
              placeholderTextColor="black"
              inputContainerStyle={styles.formInput}
              value={this.state.lastName}
              autoCapitalize="none"
              onChangeText={lastName => this.setState({ lastName })}
            />
            <Input
              underlineColorAndroid="black"
              placeholder="Email"
              placeholderTextColor="black"
              inputContainerStyle={styles.formInput}
              value={this.state.email}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            />
            <Input
              underlineColorAndroid="black"
              placeholder="Cell Phone"
              keyboardType="numeric"
              maxLength={10}
              placeholderTextColor="black"
              inputContainerStyle={styles.formInput}
              value={this.state.cellPhone}
              autoCapitalize="none"
              onChangeText={cellPhone => this.setState({ cellPhone })}
            />
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
            <Input
              underlineColorAndroid="black"
              placeholder="Confirm Password"
              placeholderTextColor="black"
              inputContainerStyle={styles.formInput}
              value={this.state.confirmPassword}
              secureTextEntry={true}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
            />
          </View>
          <View>
            <Button
              onPress={this.createUser}
              buttonStyle={styles.buttonStyle}
              title="Complete Sign-Up"
            />
            <View style={styles.errorStyle}>
              <Text>{this.state.error}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    width: SCREEN_WIDTH * 0.8
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: '#323232',
    width: SCREEN_WIDTH * 0.8,
    borderRadius: 2,
  },
  errorStyle: {
    marginTop: 10,
  }
});

function mapStateToProps(state) {
  return {
    signupSuccess: state.authReducer.signupSuccess,
    signupIsLoading: state.authReducer.signupIsLoading,
    signupError: state.authReducer.signupError,
  }
}

export default connect(mapStateToProps, actions)(Signup);