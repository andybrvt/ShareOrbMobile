import React from 'react';
import { Text,
   View,
   Button,
   StyleSheet,
   ScrollView,
   Dimensions,
   FlatList,
   TouchableHighlight,
   TextInput,
   Keyboard,
   TouchableOpacity
  } from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import MainLogo from '../logo.svg';
import { Bell,ArrowUpCircle, Plus, Mail, UserPlus, Globe } from "react-native-feather";
import { connect } from 'react-redux';


class SimpleExplore extends React.Component{

  renderItem = () => {
    return <View><Text>Hi</Text></View>
  }

  listHeader = () => {
    return(
      <View style = {styles.header}>
        <View style = {styles.sideHeaders}>
          <TouchableOpacity
            onPress = {() => this.props.navigation.navigate("Profile")}
            >
            <Avatar
              source = {{
                uri: `${global.IMAGE_ENDPOINT}` + this.props.profilePic,
              }}
              rounded
              size = {30}
               />

          </TouchableOpacity>

        </View>

        <View style = {styles.middleHeader}>
          <MainLogo
            height = {"80%"}
            width = {"45%"}
             />

        </View>

        <View style = {styles.sideHeaders}>




            <TouchableOpacity
              onPress = {() => this.props.navigation.navigate("notification")}
              >
              <Bell
                width={25}
                height={25}
                stroke = "black"
                fill = "white"
                style={{marginRight:5}}
                 />

                 {
                   this.props.notificationSeen > 0 ?

                   <View  style={{position:'absolute', right:'20%', top:'0%',}}>
                     <View style = {styles.notiCircle}>
                     </View>
                   </View>

                   :

                   null
                 }

            </TouchableOpacity>




        </View>



      </View>
    )
  }

  render(){


    const groupPosts = [1,2, 3]
    return(
      <BackgroundContainer>
        <FlatList
          stickyHeaderIndices={[0]}
          contentContainerStyle={{paddingBottom:50}}
          ListHeaderComponent = {this.listHeader}
          showsVerticalScrollIndicator={false}
          style = {{flex: 1}}
          data = {groupPosts}
          renderItem = {this.renderItem}
          keyExtractor={(item, index) => String(index)}
          // onRefresh = {() => this.onRefresh()}

           />

      </BackgroundContainer>
    )
  }
}

const mapStateToProps = state => {
  return{
    id: state.auth.id,
    profilePic: state.auth.profilePic,
    username: state.auth.username,
    notificationSeen: state.auth.notificationSeen,
    secondUsername: state.auth.secondUsername,
    isOtherAccount: state.auth.isOtherAccount
  }
}


const styles = StyleSheet.create({
  header: {
    height: 50,
    // backgroundColor: '#1890ff',
    backgroundColor:'white',
    width: '100%',
    flexDirection: 'row'
  },
  sideHeaders:{
      width: '15%',
      alignItems: 'center',
      justifyContent: 'center'
  },
  middleHeader:{
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notiCircle: {
    position:'absolute',
    height: 10,
    width: 10,
    borderRadius: 1000,
    backgroundColor:'red',
  },
})

export default connect(mapStateToProps, null)(SimpleExplore);
