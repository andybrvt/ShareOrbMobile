import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   Image,
   TouchableOpacity
  } from 'react-native';
import { Avatar, BottomNavigation } from 'react-native-paper';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 11 / 16);
const imageWidth = dimensions.width*0.50;

class PictureBox extends React.Component{

  onPostDirect = cellId => {
    this.props.navigation.navigate("DayAlbum",{
      cellId: cellId
    })
  }


  onProfileDirect = username => {

    this.props.navigation.navigate("ProfilePage", {
      username: username
    })
  }


  render(){
    let coverPic = ''
    let profilePic = ""
    let firstName = ""
    let lastName = ""

    let cellId = 0;
    let userId = 0;
    console.log(this.props.cell)
    if(this.props.cell){
      if(this.props.cell.id){
        cellId = this.props.cell.id
      }
      if(this.props.cell.coverPic){
        coverPic= this.props.cell.coverPic
      }

      if(this.props.cell.socialCalUser){
        profilePic = this.props.cell.socialCalUser.profile_picture

        if(this.props.cell.socialCalUser.first_name){
          firstName = this.props.cell.socialCalUser.first_name

        }

        lastName = this.props.cell.socialCalUser.last_name

        if(this.props.cell.socialCalUser.id){
          cellId = this.props.cell.socialCalUser.id;

        }


      }

    }
    return(
      <TouchableOpacity
        onPress = {() => this.onPostDirect(cellId)}
        key = {this.props.index}
        style = {styles.picBoxContainer}>
        <View style = {styles.pictureHolder}>
          <Image
            style = {styles.image}
            resizeMode = "cover"
            source={{ uri: `${global.IMAGE_ENDPOINT}${coverPic}` }}
             />
           <View style = {styles.ownerContainer}>
             <Avatar.Image
               onPress = {() => this.onProfileDirect(userId)}
               source = {{
                 uri: `${global.IMAGE_ENDPOINT}${profilePic}`
               }}

               size = {30}
                />
              <Text style = {styles.videoFooterUserName}>{global.NAMEMAKE(firstName, lastName, 20)}</Text>
           </View>

        </View>


      </TouchableOpacity>
    )
  }
}

export default PictureBox;

const styles = StyleSheet.create({
  videoFooterUserName: {

    color:'white',
    fontSize:14,
    // textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
    fontWeight:'bold',
    left:5,
    // fontWeight:'bold',

  },
  picBoxContainer: {
    height: imageHeight,
    width: imageWidth,
    overflow: "hidden",
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureHolder: {
    backgroundColor: "lightgray",
    width:"92%",
    height: "92%",
    borderRadius: 10,
    overflow: 'hidden'
  },
  image:{
    flex: 1
  },
  ownerContainer: {
    position: "absolute",
    padding: 10,
    bottom: 2,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ownerName: {
    marginLeft:5,
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }

})
