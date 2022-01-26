import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { darkTheme, theme } from './src/theme';
import Welcome from './src/screens/welcome';
import Onboarding from './src/screens/onboarding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Login from '@/screens/authentication/login';

const darkMode = false;

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => (
  <AuthenticationStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
    <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    <AuthenticationStack.Screen name="Login" component={Login} />
  </AuthenticationStack.Navigator>
);

export default function App() {
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <NavigationContainer>
        <AuthenticationNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
