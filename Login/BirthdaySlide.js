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
import { ArrowRightCircle, Plus, Mail, UserPlus } from "react-native-feather";


 class BirthdaySlide extends React.Component{


   render(){

     return(

       <View>
         <Button
           title = "close"
           onPress = {() => this.props.closeModal(this.props.closeNum)}
            />
          <Text style = {{
              color: 'white'
            }}>Birthday</Text>
          <Text style = {{
              color: 'white'
            }}>{dateFns.format(this.props.value, "MMMM dd yyyy")}</Text>
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

         <TouchableOpacity
           onPress = {() => this.props.openModal(this.props.openNum)}
           >
           <ArrowRightCircle
             stroke = "white"
             />
         </TouchableOpacity>
       </View>

     )
   }
 }

 export default BirthdaySlide;
