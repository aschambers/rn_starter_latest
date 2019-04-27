import React, { Component } from 'react';
// redux setup
import configureStore from './redux/store';
export const store = configureStore();
import { Provider } from 'react-redux';
// navigation setup
import MainNavigator from './navigation';

class Main extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    )
  }
}

export default Main;