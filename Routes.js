import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator} from 'react-native-screens/native-stack';
import React from 'react';
import NewsfeedView from './Newsfeed/NewsfeedView';
import Friends from './Friends';
import Login from './Login/Login';
import LoadingScreen from './Login/LoadingScreen';
import Signup from './Signup/Signup';
import Explore from './Explore/Explore';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { TransitionPresets} from '@react-navigation/stack';
const Tab = createMaterialBottomTabNavigator();


enableScreens();
const Stack = createNativeStackNavigator();

class Routes extends React.Component{

  render(){
    return(
      <Stack.Navigator screenOptions={{headerShown: false,}}>
        {
          this.props.isAuthenticated === true ?

          <Stack.Screen name = "LoadingScreen" component = {LoadingScreen} />

          :

          <Stack.Screen name = "Login" component = {Login} />

        }

        <Stack.Screen
           name = "Signup" component = {Signup} />
        <Stack.Screen name = "Explore" component = {Explore} />

      </Stack.Navigator>
    )

  }


}

export default Routes;
