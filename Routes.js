import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import React from 'react';
import Home from './Home';


enableScreens();
const Stack = createNativeStackNavigator();

class Routes extends React.Component{

  render(){
    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />

      </Stack.Navigator>
    )

  }


}

export default Routes;
