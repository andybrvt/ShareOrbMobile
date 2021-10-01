import React from "react";
import { Text, View, Button,StyleSheet, Image, Dimensions, TouchableOpacity,
ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback} from 'react-native';
import { Navigation2, Heart, MessageCircle, VolumeX, Volume2 } from "react-native-feather";
import { LinearGradient } from 'expo-linear-gradient';

import { Avatar } from 'react-native-elements';


const width = Dimensions.get("window").width

class NewGlobePost extends React.Component{


  render(){

    console.log(this.props.data, 'data here')

    let postId = ""
    let itemImage = ""
    let groupPic = ""
    let groupName = ""
    let members = []

    let creatorPic = ""
    let username = ""
    let firstName = ""
    let lastName = ""

    if(this.props.data){
      if(this.props.data.post){

        if(this.props.data.post.itemImage){
          itemImage = `${global.IMAGE_ENDPOINT}` + this.props.data.post.itemImage
        }

        if(this.props.data.post.creator){
          creatorPic  = `${global.IMAGE_ENDPOINT}`+ this.props.data.post.creator.profile_picture
          username = this.props.data.post.creator.username
        }



      }
      if(this.props.data.group){
        if(this.props.data.group.groupPic){
          groupPic = `${global.IMAGE_ENDPOINT}` + this.props.data.group.groupPic
        }
        if(this.props.data.group.group_name){
          groupName = this.props.data.group.group_name
        }
        if(this.props.data.group.members){
          members = this.props.data.group.members
        }

      }
    }

    return(
      <View style = {styles.totalHolderContainer}>


        <View style = {styles.topContainer}>

          <View style = {{
              width: '65%',
              justifyContent: 'center'
            }}>

            <View style = {{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10
              }}>
              <Avatar
                size = {50}
                rounded
                source = {{
                  uri: groupPic
                }}
                 />
               <View style = {{
                   marginLeft: 10
                 }}>
                 <Text style = {{
                    fontSize: 20,
                    }}>{global.CAPITALIZE(groupName)}</Text>
                  <View style = {{
                      // alignItems: 'center',
                      // justifyContent: 'center'
                    }}>
                    <Text>{members.length} members</Text>
                  </View>
               </View>

          </View>

          </View>

          <View style = {{
              width: '35%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>


            {
              members.includes(this.props.id) ?

              <View style = {styles.joinedbtn} >
                <Text style = {{color: 'white'}}>Joined</Text>
              </View>

              :


              <TouchableOpacity style = {styles.joinbtn} >
                <Text style = {{color: 'white'}}>Join</Text>
              </TouchableOpacity>



            }



          </View>



        </View>


        <View style = {styles.bottomContainer}>
          <Image
            style={styles.cover}
            resizeMode = "cover"
            source={{ uri: itemImage }}
            // blurRadius = {15}
             />

             <LinearGradient
               start={{x: 0, y: 0}} end={{x: 0, y: 1}}

               style = {{
                 position: 'absolute',
                 width: '100%',
                 bottom: '0%',
                 height: "30%"
               }}
               colors = {['transparent', '#000000']}>
             </LinearGradient>




        </View>


        {/*
          <View style = {styles.container}>




               <View style = {styles.ownerHolder}>
                 <View >
                   <Avatar
                     size = {40}
                     rounded
                     source = {{
                       uri: groupPic
                     }}
                      />
                 </View>

                 <View style = {{
                     marginLeft: 7
                   }}>
                   <Text style = {{
                       color: 'white',
                       fontSize: 17}}> {global.CAPITALIZE(username)}</Text>
                 </View>


               </View>


          </View>

          */}


      </View>

    )
  }
}

const styles = StyleSheet.create({
  totalHolderContainer: {
    position: 'relative',
    // backgroundColor: 'red',
    marginBottom: 20,
    height: 500
    // flexDirection: 'row'
  },
  topContainer:{
    height: '18%',
    flexDirection:  'row'
  },
  bottomContainer: {
    height: '82%',
    backgroundColor: 'gainsboro'
  },
  joinbtn: {
    height: 40,
    width: '80%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'limegreen',
    borderRadius: 20
  },
  joinedbtn: {
    height: 40,
    width: '80%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'gray',
    borderRadius: 20
  },
  cover: {
    width: '100%',
    height: '100%'
  }


})

export default NewGlobePost;
