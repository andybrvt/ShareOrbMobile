import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import React from 'react';
import NewsfeedView from './Newsfeed/NewsfeedView';
import Friends from './Friends';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Explore from './Explore/Explore';
import SocialCalendar from './ProfilePage/SocialCalendar';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const Tab = createMaterialBottomTabNavigator();


enableScreens();
const Stack = createNativeStackNavigator();

class Routes extends React.Component{

  render(){
    return(
      <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name = "Login" component = {Login} />
        <Stack.Screen name = "Signup" component = {Signup} />

      </Stack.Navigator>
    )

  }


}

export default Routes;
