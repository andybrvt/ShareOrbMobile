import React from 'react';


// This page will use mostly to introduce the user to
// what we are about and the

import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity
 } from 'react-native';
import newfeedpic from '../newfeedpic.jpg';
import profilepic from '../profilepic.jpg';
import postingpic from '../postingpic.jpg';
import MainLogo from '../logo.svg';
import Frame from '../Frame.svg';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import authAxios from '../util';
import PhoneContacts from './PhoneContacts';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class AppIntro extends React.Component{

  state = {
    stuff:[0, 1, 2, 3, 4, 5],
    curIndex: 0,
  }
  close = () =>  {
    authAxios.post(`${global.IP_CHANGE}`+'/userprofile/unShowIntialInstructions/'+this.props.id)
    .then(res => {
      this.props.navigation.navigate("tabs")
    })
    .catch(err => {
      alert(err)
    })
  }

  renderItem(item, index){
    if(index === 1){
      return(
        <View>
        <View style = {{
            flex: 1,
            width: width,
            alignItems: 'center'
          }}>
          <Text style = {{
              top: '10%',
              color: 'white',
              fontSize: 30
            }}>
            Welcome to ShareOrb
          </Text>
          <View style = {{
              top: '30%'
            }}>
            <Frame height = {125} width = {125}/>
          </View>
        </View>
        <View style = {{
            flex: 1,
            width: width,
            alignItems: 'center',

            }}>
          <Text style = {{
              top: '10%',
              padding:30,
              color: 'white',
              fontSize: 35
            }}>
            The social journal that believes...
          </Text>
          <View style = {{
              top: '20%'
            }}>
            <Text style = {{
                color: 'white',
                fontSize: 25
              }}>we are what we do everyday </Text>
          </View>
        </View>
        </View>
      )
    }

    if(index === 2){
      return(
        <View style = {{flex: 1,
            width: width,
            alignItems: 'center'
            }}>
          <View style = {{
              top: '2.5%'
            }}>
            <View style={{padding:30}}>
            <Text style = {styles.welcomeText}>
              Start Fresh. Your feed empties every 24 hours
            </Text>
            </View>
          </View>
          <View
            style = {{
              top: '5%',
              height: "65%",
              width: width*0.75,
              borderRadius: 10,
              overflow: 'hidden'
            }}>
            <Image
              resizeMode = "cover"
              style = {{
                width: "100%",
                height: '100%'
              }}
              source = {newfeedpic}
               />
          </View>
        </View>
      )
    }

    if(index === 3){
      return(
        <View style = {{flex: 1,
            width: width,
            alignItems: 'center'
            }}>
            <View style = {{
                top: '2.5%'
              }}>
              <View style={{padding:30}}>
              <Text style = {styles.welcomeText}>
                  Build your album. One album a day
              </Text>
              </View>
            </View>
            <View
              style = {{
                top: '5%',
                height: "65%",
                width: width*0.75,
                borderRadius: 10,
                overflow: 'hidden'
              }}
              >
              <Image
                resizeMode = "cover"
                style = {{
                  width: "100%",
                  height: '100%'
                }}
                source = {profilepic}
                 />
            </View>
        </View>
      )
    }

    if(index === 4){
      return(
        <View style = {{flex: 1,
            width: width,
            alignItems: 'center'
            }}>
          <View style = {{
              top: '2.5%'
            }}>
            <View style={{padding:30}}>
              <Text style = {styles.welcomeText}>
                Just take a photo, journal, and share!
              </Text>
            </View>
          </View>
          <View
            style = {{
              top: '2.5%',
              height: "60%",
              width: width*0.75,
              borderRadius: 10,
              overflow: 'hidden',
            }}
            >
            <Image
              resizeMode = "cover"
              style = {{
                width: "100%",
                height: '100%'
              }}
              source = {postingpic}
               />
          </View>
          <TouchableOpacity
             onPress = {() => this.close()}
             style = {styles.loginBtn}>
            <Text style = {styles.loginText}>Let's go!</Text>
          </TouchableOpacity>
        </View>
      )
    }
    {/*
    if(index === 5){
      return(
        <View>
        <View style={{right:25, position:'absolute'}}><Text style = {styles.welcomeText}> Skip</Text></View>
        <View style = {{flex: 1,
            width: width,
            alignItems: 'center'
            }}>
          <View style = {{
              top: '2.5%'
            }}>

            <View style={{padding:30}}>
              <Text style = {styles.welcomeText}>
                Invite Friends
              </Text>
            </View>

          </View>

          <PhoneContacts/>
          <TouchableOpacity
             onPress = {() => this.close()}
             style = {styles.loginBtn}>
            <Text style = {styles.loginText}>Let's go!</Text>
          </TouchableOpacity>

        </View>
        </View>
      )
    }
    */}


  }

  unShowInstructions = () =>{



  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", changed);
  }

  onScroll = (event) => {
    const index = event.nativeEvent.contentOffset.x / width;
    const roundedIndex = Math.round(index)

    this.setState({
      curIndex: roundedIndex
    })
  }


  render(){


    return(
      <View style = {{flex: 1}}>


          <SafeAreaView style = {styles.container}>

              <FlatList
                pagingEnabled
                onViewableItemsChanged={this.onViewableItemsChanged }
                horizontal
                width = {width}
                data = {this.state.stuff}
                renderItem = {({item, index}) =>{return this.renderItem(item,index)}}
                keyExtractor={(item, index) => String(index)}
                onScroll = {this.onScroll}
                showsHorizontalScrollIndicator={false}

                 />

               <Pagination
                 activeDotIndex = {this.state.curIndex}
                 dotsLength = {5}
                 dotColor ={'white'}
                 inactiveDotColor = {'white'}
                  />


          </SafeAreaView>



      </View>
    )

  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#1890ff",
    alignItems: 'center',
  },
  purposeText:{
    color: 'white'
  },
  infoText: {
    color: 'white',
    textAlign: 'center'
  },
  welcomeText: {
    padding:5,
    color: "white",
    fontSize: 27.5,
    top: '7%',
    textAlign: 'center'
  },
  headerText: {
    color: 'white'
  },
  header2Text: {
    color: 'white',
    fontSize: 25,
  },
  bodyText:{
    color: 'white'
  },

  loginBtn: {
    position: "absolute",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    top: '91%',
    zIndex: 9999,
    backgroundColor: "white",
  },
  loginText: {
    color: '#1890ff',
    fontSize: 18,
  },



})

export default AppIntro;
