import React from 'react';

// import * as Sharing from 'expo-sharing';
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
  TouchableOpacity,
  Share,
  Alert
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
import { Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { Mic, Bell, Unlock, Lock, User, Video} from "react-native-feather";
import { Camera } from 'expo-camera';



const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class AppIntro extends React.Component{

  state = {
    stuff:[0, 1, 2, 3, 4],
    curIndex: 0,
    allowCamera: false,
    allowMicrophone: false
  }

  createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure?",
      "ShareOrb is more fun with friends",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Skip", style:'destructive', onPress: () => console.log("OK Pressed") }
      ]
    );

    allowCameraPermissions = async() => {
      try{
        const camera = await Camera.requestPermissionsAsync();
        // const microphone = await Camera.requestMicrophonePermissionsAsync();
        if(camera.status  == "granted"){
          this.setState({
            allowCamera: true,
          })
        }
      }
      catch(err){
        alert(err)
      }
    }
    allowMicrophonePermissions = async() => {
          try{
            const camera = await Camera.requestMicrophonePermissionsAsync();
            if(camera.status  == "granted"){
              this.setState({
                allowMicrophone: true,
              })
            }
          }
          catch(err){
            alert(err)
          }
    }

  shareMessage = () => {
    //Here is the Share API
    Share.share({
      // message: inputValue.toString(),
      message:"Join ShareOrb with my code: N24FJFE"
    })
      //after successful share return result
      .then((result) => console.log(result))
      //If any thing goes wrong it comes here
      .catch((errorMsg) => console.log(errorMsg));
  };

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
    {/*
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
    */}

    {/*
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
              fontFamily:'Nunito-Bold',
              fontSize: 30
            }}>
            Welcome to ShareOrb!
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
              padding:30,
              color: 'white',
              fontSize: 35,
              fontFamily:'Nunito-Bold',
            }}>
            The social journal that believes...
          </Text>
          <View style = {{
              top: '20%'
            }}>
            <Text style = {{
                color: 'white',
                fontSize: 25,
                fontFamily:'Nunito-Bold',
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

            }}>
            <View style = {{
                top: '2.5%'
              }}>

              <Text style = {styles.skipText}>
                Skip
              </Text>

            </View>
          <View style = {{
              top: '2.5%'
            }}>
            <View style={{padding:30}}>
            <Text style = {styles.welcomeText}>
              (switch with page 4)
              Add a profile picture
            </Text>
            </View>
            <TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Avatar
                size={100}
                rounded
                source={{
                  uri:
                    `${global.IMAGE_ENDPOINT}`+this.props.profile_picture,
                }}
              />
            </View>
            </TouchableOpacity>
          </View>

        </View>
      )
    }


    if(index === 3){
      return(
        <View style = {{flex: 1,
            width: width,

            }}>
            <View style = {{
                top: '2.5%',
                right:'2.5%',
                position:'absolute',
              }}>
              <TouchableOpacity onPress={this.createTwoButtonAlert}>
                <Text style = {styles.skipText}>
                  Skip
                </Text>
              </TouchableOpacity>

            </View>
          <View style = {{
              top: '2.5%'
            }}>
            <View style={{padding:30}}>
            </View>

            <View style={{alignItems: 'center'}}>
              <Avatar
                size={150}
                rounded
                source={{
                  uri:
                    `${global.IMAGE_ENDPOINT}`+this.props.profile_picture,
                }}
              />
            <View style={{alignItems: 'center'}}>
                <Text style = {styles.welcomeText}>
                  {this.props.firstName} {this.props.lastName}
                </Text>
                <Text style={{fontSize:35, color:'white', fontFamily:'Nunito-Bold'}}>
                  Invite some friends
                </Text>
              </View>

              <Text style = {styles.welcomeText}>
                Your Code:&nbsp;
                <Text  style={{fontSize:35, color:'white', fontFamily:'Nunito-Bold'}}>
                  N693FD
                </Text>
              </Text>

              <Text style = {styles.welcomeText}>
                5 invites left
              </Text>
            </View>


          </View>
          <View style={{alignItems: 'center', top:'25%'}}>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this.shareMessage}
            >
          <Text style = {styles.loginText}>
            Share Invites
          </Text>
        </TouchableOpacity>
      </View>
        </View>
      )
    }
    */}

    if(index === 4){
      return(
        <View style = {{flex: 1,
            width: width,
            alignItems: 'center'
            }}>
          <View>
            <View style={{padding:30}}>
              <Text style = {styles.welcomeText}>
                Enable Permissions
              </Text>
              <View style={{textAlign:'center', top:20}}>
              <Text style={styles.permissionsText}>
                For the best experience, we'll need you to allow a few permissions to get started
              </Text>
              </View>
            </View>
          </View>
          <View
            style = {{
              height: "70%",
              width: width*0.85,
              borderRadius: 10,
              overflow: 'hidden',
            }}
            >
            <TouchableOpacity onPress={this.allowCameraPermissions}>
              <View style={{flexDirection:'row'}}>
                <View style={{justifyContent:'center'}}>
                  <Video stroke="white" strokeWidth={1.5} width={27.5} height={27.5} />
                </View>
                <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
                  <Text style={styles.headerText}>
                    Camera
                  </Text>
                  <Text style={styles.permissionsText}>
                    Lets you take pictures and videos on the spot
                  </Text>
                </View>
                { !this.state.allowCamera?
                  <View style={{justifyContent:'center'}}>
                    <Lock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                  </View>
                :
                  <View style={{justifyContent:'center'}}>
                    <Unlock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                  </View>
                }
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.allowMicrophonePermissions}>
              <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center'}}>
                <Mic stroke="white" strokeWidth={1.5} width={27.5} height={27.5} />
              </View>
              <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
                <Text style={styles.headerText}>
                  Microphone
                </Text>
                <Text style={styles.permissionsText}>
                  Enable audio for posts
                </Text>
              </View>
              { !this.state.allowMicrophone?
                <View style={{justifyContent:'center'}}>
                  <Lock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              :
                <View style={{justifyContent:'center'}}>
                  <Unlock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              }
            </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center'}}>
                <Bell stroke="white" strokeWidth={1.5} width={27.5} height={27.5} />
              </View>
              <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
                <Text style={styles.headerText}>
                  Notifications
                </Text>
                <Text style={styles.permissionsText}>
                  Keeps you in the loop
                </Text>
              </View>
              <View style={{justifyContent:'center'}}>
                <Lock stroke="white" strokeWidth={2} width={27.5} height={27.5}  />
              </View>
            </View>
            <View style={{flexDirection:'row'}}>
              <View style={{justifyContent:'center'}}>
                <User stroke="white" strokeWidth={2} width={27.5} height={27.5} />
              </View>
              <View style={{flexDirection:'column', width:'77.5%', padding:20}}>
                <Text style={styles.headerText}>
                  Contacts
                </Text>
                <Text style={styles.permissionsText}>
                  Find friends and let them find you
                </Text>
              </View>
              { !this.state.allowMicrophone?
                <View style={{justifyContent:'center'}}>
                  <Lock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              :
                <View style={{justifyContent:'center'}}>
                  <Unlock stroke="white" strokeWidth={2}  width={27.5} height={27.5} />
                </View>
              }
            </View>
            <View style={{flexDirection:'row'}}>

            </View>
          </View>
          <TouchableOpacity
             onPress = {() => this.close()}
             style = {styles.loginBtn}>
            <Text style = {styles.loginText}>Let's Go!</Text>
          </TouchableOpacity>
        </View>
      )
    }





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
    console.log("ESTTTTTTTTTTTTTTTTt")
    console.log(this.props)

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
                 dotsLength = {4}
                 dotColor ={'white'}
                 inactiveDotColor = {'white'}
                  />


          </SafeAreaView>



      </View>
    )

  }
}


const styles = StyleSheet.create({
  headerText:{
    color:'white',
    fontSize:17,
    fontFamily:'Nunito-Bold',
  },
  permissionsText:{
    color:'white',
    fontSize:15,
    fontFamily:'Nunito',
  },
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
    textAlign: 'center',
    fontFamily:'Nunito-SemiBold',
  },
  skipText: {
    // position:'absolute',
    padding:10,
    color: "white",
    fontFamily:'Nunito-Bold',
    fontSize: 15,
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
    top: '90%',
    zIndex: 9999,
    backgroundColor: "white",
  },
  loginText: {
    color: '#1890ff',
    fontSize: 18,
    fontFamily:'Nunito-Bold',
  },



})


const mapStateToProps = state => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    userId: state.auth.id,
    username: state.auth.username
  }
}


 export default connect(mapStateToProps, null)(AppIntro)
