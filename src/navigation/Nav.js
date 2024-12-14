import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/onBoarding/Login';
import Splash from '../screens/Splash/Splash';
import OTPScreen from '../screens/onBoarding/OTPScreen';
import Home from '../screens/HomeScreen/Home';

const Nav = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName='Splash'
    screenOptions={{
      headerShown: false,
    }}
    >
      <Stack.Screen name="Login" component={Login} options={{
        animation:'ios_from_right',
      }}/>
      <Stack.Screen name="Splash" component={Splash} options={{
        animation:'ios_from_right',
      }}/>
      <Stack.Screen name="OTP" component={OTPScreen} options={{
        animation:'ios_from_right',
      }}/>
      <Stack.Screen name="Home" component={Home} options={{
        animation:'ios_from_right',
      }}/>
  
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default Nav