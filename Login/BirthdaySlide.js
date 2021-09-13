import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Share,
  Alert
 } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as dateFns from 'date-fns';
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus } from "react-native-feather";

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height


 class BirthdaySlide extends React.Component{


   render(){

     return(

       <View >
         <Button
           title = "close"
           onPress = {() => this.props.closeModal(this.props.closeNum)}
            />
          <View style = {styles.topContainer}>
            <Text style = {{
                color: 'white',
                fontSize: 25

              }}>When is your birthday?</Text>
          </View>

          <View style = {styles.midContainer}>
            <Text style = {{
                color: 'white'
              }}>{dateFns.format(this.props.value, "MMMM dd yyyy")}</Text>
          </View>


          <View >
            <DateTimePicker
              testID="dateTimePicker"
              value = {this.props.value}
              mode="date"
              is24Hour={true}
              display="spinner"
              onChange = {this.props.onChange}
              maximumDate = {new Date()}
              textColor = 'white'
              />

          </View>

          <View style = {styles.bottomContainer}>

            <View style = {styles.bottomLContainer}>
              <TouchableOpacity
                onPress = {() => this.props.closeModal(this.props.closeNum)}
                >
                <ArrowLeftCircle
                  width = {40}
                  height = {40}
                  stroke = "white"
                  />
              </TouchableOpacity>

            </View>

            <View style = {styles.bottomRContainer}>
              <TouchableOpacity
                onPress = {() => this.props.openModal(this.props.openNum)}
                >
                <ArrowRightCircle
                  width = {40}
                  height = {40}
                  stroke = "white"
                  />
              </TouchableOpacity>
            </View>
          </View>
        </View>

     )
   }
 }

const styles = StyleSheet.create({
  topContainer: {
    width: width,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  midContainer: {
    height: '18%',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,

  },
  textContainer: {
    alignItems:'center',
    justifyContent: 'center',
    height: '50%',
    width: width,
  },
  bottomContainer: {
    height: '25%',
    width: width,
    flexDirection:'row'
  },
  bottomLContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30
  },
  bottomRContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 30
  }
})


 export default BirthdaySlide;
