import React from 'react';
import {
Text,
View,
Button,
StyleSheet,
ScrollView,
Dimensions,
Image,
TextInput,
ActivityIndicator,
TouchableOpacity,
TouchableHighlight,
Modal,
Keyboard,
TouchableWithoutFeedback
} from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, ChevronsUp } from "react-native-feather";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { SCREEN_HEIGHT, SCREEN_WIDTH} from "../Constants";
import FadingUpArrow from './FadingUpArrow';
import { Avatar, BottomNavigation } from 'react-native-paper';
import Tags from "react-native-tags";
 class FinalPostingPage extends React.Component{

   frequentChatPeople = () => {
     // this function will be used to render the headers of the
     // chats

     return (

       <View style = {styles.frequentPeopleContainer}>
         <View style={[styles.column]}>
           <Image
             source = {{
               uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
             }}
             style={[styles.previewImage]}
           />
         </View>

         <View style={[styles.column]}>
            <Image
              source = {{
                uri: 'https://images.unsplash.com/photo-1610555248279-adea4c523fb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
              }}
              style={[styles.previewImage]}
            />
         </View>

         <View style={[styles.column]}>
           <Image
             source = {{
               uri: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
             }}
             style={[styles.previewImage]}
            />
         </View>

         <View style={[styles.column]}>
            <Image
              source = {{
                uri: 'https://images.unsplash.com/photo-1610490689129-26c48e3cb975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
              }}
              style={[styles.previewImage]}
             />
          </View>
         <View style={[styles.column]}>
            <Image
              source = {{
                uri: 'https://images.unsplash.com/photo-1618125857227-df2ded76ec2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
              }}
              style={[styles.previewImage]}
             />
          </View>

          <View style={[styles.column]}>
            <Image
              source = {{
                uri: 'https://images.unsplash.com/photo-1558339136-19ee57afe7a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
              }}
              style={[styles.previewImage]}
             />
          </View>

          <View style={[styles.column]}>
             <Image
               source = {{
                 uri: 'https://images.unsplash.com/photo-1610490689129-26c48e3cb975?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
               }}
               style={[styles.previewImage]}
              />
           </View>
      </View>
     )
   }
   /*
   return back to posting page
   */
   onBack = () => {
     this.props.onCancel()
   }

   render(){

     return (
       <Animated.View
         style = {{
           position: "absolute",
           backgroundColor: "white",
           ...StyleSheet.absoluteFill,
           transform: [
             {translateY: this.props.slide}
           ]
         }}
         >
             <View>
               <ScrollView
                 showsHorizontalScrollIndicator={false}
                 horizontal = {true}>
                 {this.frequentChatPeople()}
               </ScrollView>
               <View style={styles.addBorder}>
                <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
                   <TextInput
                     style = {{
                       width: "100%",
                       fontSize: 18,
                     }}
                    placeholder="Write something about your day..."
                    placeholderTextColor="lightgray"
                    multiline = {true}
                    numberOfLines = {2}
                    value = {this.props.caption}
                    onChangeText = {this.props.onChange}
                  />
                </TouchableWithoutFeedback>
               </View>

             </View>
             <View style={{height:'35%', top:25}}>

               <View>
                 <View style={{padding:30}}>
                    <Text>Tags</Text>
                    <View style={{padding:10}}>
                      <Tags
                      initialText="Press space to create tab"
                      textInputProps={{
                        placeholder: "Any type of animal"
                      }}
                      initialTags={[]}
                      onChangeTags={tags => console.log(tags)}
                      onTagPress={(index, tagLabel, event, deleted) =>
                        console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                      }
                      maxNumberOfTags={3}
                      containerStyle={{ justifyContent: "center"}}
                      inputStyle={{ backgroundColor: "#d9d9d9", }}
                      tagContainerStyle={{}}

                      tagTextStyle={{ color:'blue' }}

                      renderTag={({ tag, index, onPress, deleteTagOnPress, readonly }) => (

                        <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                          <View style={{backgroundColor:'#f0f0f0', borderRadius:10,  padding:10,}}>
                          <Text>{tag}</Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                 <Text>Location</Text>
                 </View>
               </View>

             </View>
           <FadingUpArrow />
       </Animated.View>


     )

   }
 }

const styles = StyleSheet.create({

  previewImage:{
    width:90, height:90, borderRadius:15,
  },
  frequentPeopleContainer: {
    marginTop:30,

    flexDirection: 'row'
  },
  column:{
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',       //THIS LINE HAS CHANGED
    paddingLeft: 20,
    justifyContent:'center',

  },
  addBorder:{
    top:'10%',
    padding:30,
    height:175,
    borderTopWidth:1,
    borderTopColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',

  },
  container: {
    flex: 1,

  },
  topContainer: {
    flex: 3,
    backgroundColor: 'green'
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'pink',
    padding:20
  }


})

 export default FinalPostingPage;
