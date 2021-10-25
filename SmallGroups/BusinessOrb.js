import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Dimensions
 } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ChevronsLeft } from "react-native-feather";



class BusinessOrb extends React.Component {
  render(){
    return(
      <SafeAreaView style = {{
          flex:1,
          backgroundColor: 'white',
          padding: 10
        }}>

        <View>
        <Text> Hi</Text>
        </View>

      </SafeAreaView>

    )
  }
}


export default BusinessOrb;
