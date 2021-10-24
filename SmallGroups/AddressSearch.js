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

// any questions you have about google places and billing go here (you have to
// set up billing information inorder to deploy)
//https://developers.google.com/maps/documentation/places/web-service/cloud-setup

// this is for the api key you need to get
// https://developers.google.com/maps/documentation/places/web-service/get-api-key/

// PLEASE LOOK AT THIS BEFORE PRODUCTION
// restrict the api key
// connect billing information to the shareorb google cloud project

class AddressSearch extends React.Component{


  render(){
    return(
      <View style = {{
          flex:1,
          backgroundColor: 'gray'}}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
            this.props.setAddress(data.description)

          }}
          onFail = {(err) => {
            console.log(err)
          }}
          query={{
            key: 'AIzaSyCSJihRY1IF_wsdEWBgtK6UnmC9p_kxkh4',
            language: 'en',
          }}
        />

      </View>

    )
  }
}


export default AddressSearch;
