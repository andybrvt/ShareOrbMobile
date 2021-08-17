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


const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class AppIntro extends React.Component{

  state = {
    stuff:[0, 1, 2, 3, 4],
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
    console.log(this.props)
    if(index === 0){
      return (
        <View style = {{
            flex: 1,
            width: width,
            alignItems: 'center'
          }}>
          <Text style = {{
              top: '10%',
              color: 'white',
              fontSize: 35
            }}>
            Welcome to ShareOrb
          </Text>

          <View style = {{
              top: '30%'
            }}>
            <Frame height = {150} width = {150}/>
          </View>


        </View>
      )
    }

    if(index === 1){
      return(
        <View style = {{
            flex: 1,
            width: width,
            alignItems: 'center',
            top: '20%'
            }}>
          <Text style = {{
              top: '20%',
              color: 'white',
              fontSize: 35
            }}>
            The social journal that believes...
          </Text>



          <View style = {{
              top: '30%'
            }}>
            <Text style = {{
                color: 'white',
                fontSize: 25
              }}>We are what we do everyday </Text>
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
              top: '7%'
            }}>
            <Text style = {styles.welcomeText}>
              Newsfeed empties every 24 hours
            </Text>

          </View>

          <View
            style = {{
              top: '15%',
              height: "70%",
              width: width*0.6,
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
                top: '7%'
              }}>
              <Text style = {styles.welcomeText}>
                Photos saves to picture calendar
              </Text>

            </View>

            <View
              style = {{
                top: '15%',
                height: "70%",
                width: width*0.6,
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
              top: '7%'
            }}>
            <Text style = {styles.welcomeText}>
              Just take a photo, jorunal, and share!
            </Text>

          </View>

          <View
            style = {{
              top: '15%',
              height: "70%",
              width: width*0.6,
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


  }

  unShowInstructions = () =>{

      console.log('stuff here')


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
    color: "white",
    fontSize: 20,
    top: '7%'
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
    fontSize: 14
  },



})

export default AppIntro;
