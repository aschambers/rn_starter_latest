import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Home, Login, Signup } from '../screens';

const MainNavigator = createStackNavigator({
  Home: { screen: Home,
    navigationOptions: () => ({
        headerLeft: null,
    }),
  },
  Signup: { screen: Signup, },
  Login: { screen: Login, }
});

export default createAppContainer(MainNavigator);