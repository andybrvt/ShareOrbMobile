import React from 'react';
import { NavigationContainer, createAppContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NewsfeedView from './Newsfeed/NewsfeedView';
import Friends from './Friends';
import Login from './Login/Login';
import Signup from './Signup/Signup';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="NewsfeedView" component={NewsfeedView} />
      <Tab.Screen name="Friends" component={Friends} />

    </Tab.Navigator>
  );
}

export default Tab;
