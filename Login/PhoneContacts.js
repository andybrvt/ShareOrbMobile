import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  SectionList,
  FlatList
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import * as Contacts from 'expo-contacts';
type RowItem = {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
};
 class PhoneContacts extends React.Component{

   state = {
    loading: false,
    error: null,
    data: [],
   }

   componentDidMount() {
     console.log("FFFFFFF")
     this.grabContacts()
     console.log("GGGGGGGGG")

   }

   grabContacts= async () => {
     console.log("got ifffffffffnaaaaaaaaaaa")
     const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        this.setState({
          loading: false,
          error: null,
          data: this.state.data.concat(data),
        })

      }

   }


   render(){
     console.log("EEEEEEEEEEEEE")
     let test=this.state.data
     console.log(test)
     console.log("ENDdddddddddddddddddddd")
     return (
       <BackgroundContainer>

        <View>
        <FlatList
          keyExtractor={item => item.key}
        renderItem={({item}) =>
          <View style={styles.listcontainer}>
            <Text style={styles.textProduct}>{item.name}</Text>
            <Text style={styles.textAmount}>{item.number}</Text>
          </View>}
          // ItemSeparatorComponent={listSeparator}
          data={this.state.data}

        />
         </View>
       </BackgroundContainer>

     )
   }
 }

 const styles = StyleSheet.create({
 })

 export default PhoneContacts;
