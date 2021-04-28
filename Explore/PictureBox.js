import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   Image
  } from 'react-native';
import { Avatar, BottomNavigation } from 'react-native-paper';


class PictureBox extends React.Component{




  render(){
    let coverPic = ''
    let profilePic = ""
    let firstName = ""
    let lastName = ""

    if(this.props.cell){
      if(this.props.cell.coverPic){
        coverPic= this.props.cell.coverPic
      }

      if(this.props.cell.socialCalUser){
        profilePic = this.props.cell.socialCalUser.profile_picture

        if(this.props.cell.socialCalUser.first_name){
          firstName = this.props.cell.socialCalUser.first_name

        }

        lastName = this.props.cell.socialCalUser.last_name



      }

    }
    console.log(this.props)
    return(
      <View
        key = {this.props.index}
        style = {styles.picBoxContainer}>
        <View style = {styles.pictureHolder}>
          <Image
            style = {styles.image}
            resizeMode = "cover"
            source={{ url: `${global.IMAGE_ENDPOINT}${coverPic}` }}
             />
           <View style = {styles.ownerContainer}>
             <Avatar.Image
               source = {{
                 url: `${global.IMAGE_ENDPOINT}${profilePic}`
               }}
               size = {35}
                />
              <Text style = {styles.ownerName}>{global.NAMEMAKE(firstName, lastName, 20)}</Text>
           </View>

        </View>


      </View>
    )
  }
}

export default PictureBox;

const styles = StyleSheet.create({
  picBoxContainer: {
    height: 250,
    width: 170,
    borderRadius: 25,
    overflow: "hidden"
  },
  pictureHolder: {
    flex: 1,
  },
  image:{
    flex: 1
  },
  ownerContainer: {
    position: "absolute",
    padding: 10,
    bottom: 3,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ownerName: {
    marginLeft:5,
    color: "white",
    fontSize: 17,
    fontWeight: "bold"
  }

})
