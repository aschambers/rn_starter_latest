import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Home } from '../screens';

const MainNavigator = createStackNavigator({
  Home: {
    screen: Home
  }
});

export default createAppContainer(MainNavigator);