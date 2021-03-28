import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import React from 'react';
import Home from './Newsfeed/Home';
import Friends from './Friends';
import Login from './Login/Login';
import Signup from './Signup/Signup';

enableScreens();
const Stack = createNativeStackNavigator();

class Routes extends React.Component{

  render(){
    return(
      <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name = "Login" component = {Login} />
        <Stack.Screen name = "Signup" component = {Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Friends" component={Friends} />

      </Stack.Navigator>
    )

  }


}

export default Routes;
