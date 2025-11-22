import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import TapBarCustom from './components/TapBarCustom';
import ExploreScreen from './screens/ExploreScreen';
import ChooseMode from './screens/ChooseMode';
import ChooseCharacter from './screens/ChooseCharacter';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import DetailEvent from './components/DetailEvent';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs({ route }) {
  // Prendi il parametro character se presente
  const character = route?.params?.character;

  return (
    <Tab.Navigator
      tabBar={(props) => <TapBarCustom {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={character ? { character } : undefined}
      />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      initialParams={character ? { character } : undefined}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ChooseMode" component={ChooseMode} />
        <Stack.Screen name="ChooseCharacter" component={ChooseCharacter} />
        <Stack.Screen name="DetailEvent" component={DetailEvent} />
        {/* Flusso principale con la tab bar */}
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}