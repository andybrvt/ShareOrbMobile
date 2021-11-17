import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  RefreshControl,
  TouchableWithoutFeedback,
  Pressable,
  ActivityIndicator
 } from 'react-native';
 import authAxios from '../util';
import * as Location from 'expo-location';
import LoadingModal from '../RandomComponents/LoadingModal';

const height = Dimensions.get('window').height


class OrbSettings extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      orbInfo: {},
      loading: false,
      done: false,
    }



  }

  componentDidMount(){

    console.log(this.props.route.params.orbId)
    const orbId = this.props.route.params.orbId
    //put a function here to get orbs information
    authAxios.get(`${global.IP_CHANGE}/mySocialCal/orbGroup/`+orbId)
    .then(res => {

      this.setState({
        orbInfo: res.data
      })

    })

  }

  connectToLocation = async() => {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    this.setState({
      showLocationModal:false
    })

    let location = await Location.getCurrentPositionAsync({});
    return location
  }

  updateOrbLocation = async() => {
    // this function will be used to update orb location
    const orbId = this.props.route.params.orbId

    this.setState({
      loading: true
    })

    const location = await this.connectToLocation()

    const latitude = location.coords.latitude
    const longitude = location.coords.longitude

    const address = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude
    })

    const adi = address[0]
    const finalAdi = adi.name+", "+adi.city+', '+adi.region+' '+adi.postalCode

    console.log(finalAdi)
    const formData = new FormData()

    formData.append("latitude", latitude)
    formData.append('longitude', longitude)
    formData.append("address", finalAdi)
    // run the function here to change the location of orb

    authAxios.post(`${global.IP_CHANGE}/mySocialCal/updateOrb/`+orbId, formData)
    .then(res => {

      console.log(res.data)
      this.setState({
        orbInfo: res.data,
        loading: false,
        done: true
      })

      setInterval(() => this.setState({done: false}), 3000)

    })


  }

  render(){
    return(
      <View style = {{flex: 1}}>
        <ScrollView style = {styles.container}>
          <View style = {styles.locationContainer}>
            <View style = {styles.topLocationContainer}>
              <Text style = {{
                  color: 'gray'
                }}>{this.state.orbInfo.address}</Text>
            </View>
            <View style = {styles.bottomLocationContainer}>
              <Button
                onPress = {() => this.updateOrbLocation()}
                title = "Update current location"
                 />



            </View>

          </View>
          <LoadingModal
            visible = {this.state.loading}
             />


        </ScrollView>

        {
          this.state.done ?

          <View style = {styles.doneContainer}>
            <Text style = {{color: 'white'}}>Location changed</Text>
          </View>


          : null

        }

      </View>
          )
  }
}

const styles = StyleSheet.create({

  container: {
    flex:1,
    borderTopWidth: 1,
    borderColor: 'lightgray'
  },
  topLocationContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomLocationContainer: {
    height: '40%',
    borderTopWidth: 0.2,
    borderColor: 'lightgray'
  },
  locationContainer: {
    height: 100,
    backgroundColor: 'white'
  },
  doneContainer: {
    padding: 20,
    borderRadius: 40,
    alignSelf:'center',
    bottom: "5%",
    position: 'absolute',
    backgroundColor: '#000000aa'
  }
})


export default OrbSettings;
