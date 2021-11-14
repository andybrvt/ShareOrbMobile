import React from 'react';
import { Text,
   View,
  Button,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Search,} from "react-native-feather";
import { connect } from "react-redux";

class SearchResults extends React.Component{
  renderGroupItem = ({item}) => {

    return(
      <TouchableOpacity
        onPress = {() => this.props.groupProfile(item)}
        >
        <View style={{
           flexDirection:'row',
           padding:15}}>
          <View style={{flex:1}}>
            <Avatar
              size={40}
              rounded
              source = {{
                uri: `${global.IMAGE_ENDPOINT}`+item.groupPic
              }}
            />
          </View>
        <View style={{flex:6,flexDirection:'column'}}>
            <View style = {{flexDirection: 'row'}}>
              <Text style = {{fontFamily:'Nunito-Bold'}}>{global.NAMEMAKE(item.group_name, "", 20)} </Text>
            </View>
            <View>
              <Text style={{fontFamily:'Nunito-SemiBold'}}>Tucson, Arizona</Text>
            </View>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  renderItem = ({item}) => {

    let username = ""

    if(item.isOtherAccount){
      username = item.secondUsername
    } else {
      username = item.username
    }
    return(
      <TouchableOpacity onPress = {() => this.props.ViewProfile(item.username)}>
        <View style={{
           flexDirection:'row',
           padding:15}}>
          <View style={{flex:1}}>
            <Avatar
              size={40}
              rounded
              source = {{
                uri: `${global.IMAGE_ENDPOINT}`+item.profile_picture
              }}
            />
          </View>
        <View style={{
            flex:6,
            flexDirection:'column',
            }}>
          <View style = {{flexDirection: 'row'}}>
            <Text style = {{fontFamily:'Nunito-Bold'}}>{global.NAMEMAKE(item.first_name, item.last_name, 20)} </Text>
          </View>
          <Text style={{fontFamily:'Nunito-SemiBold'}}>{username}</Text>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  renderGroupHeader = () => {

    return(
      <View>
        <Text>Groups</Text>
      </View>
    )
  }

  render(){

    let data = [];
    let groupData = [];
    if(this.props.data){
      data = this.props.data
    }
    if(this.props.groupData){
      groupData = this.props.groupData
    }

    console.log(data)

    return(
      <KeyboardAvoidingView

        behavior = {Platform.OS =='ios'?"padding":"height"}
        style = {{
          flex: 1,
          alignItems: 'center',

        }}>
        {
          data.length === 0 && groupData.length === 0 ?

          <View style = {{
              height: 100,
              width: 200,
              alignItems: 'center',
              justifyContent: 'center',
              top:50,
            }}>
            <Search
              stroke = "gainsboro"
              strokeWidth = {2}
              height = {60}
              width = {60}
               />
             <Text
               style ={{color: 'gainsboro', fontFamily:'Nunito-Bold', fontSize:18}}
               >Looking for someone?</Text>
          </View>

          :

          <View style = {{
              flex:1,
              width: '100%',
            }}>


              <Text style={styles.settingWord}>Users</Text>
              <FlatList
                style = {{flex:1}}
                data = {data}
                renderItem = {this.renderItem}
                keyExtractor={(item, index) => String(index)}

                 />
               <View style={{marginTop:15}}>
                 <Text style={styles.settingWord}>Groups</Text>
                 </View>
                 <FlatList
                   style = {{flex: 1}}
                   data = {groupData}
                   renderItem = {this.renderGroupItem}
                   keyExtractor={(item, index) => String(index)}

                    />



          </View>
        }

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  settingWord: {
    left:5,
    color:'#919191',
    fontSize:14,
    fontFamily:'Nunito-Bold',
    marginLeft:10,
  },
})

const mapStateToProps = state => {
  return {
    userId: state.auth.id,
    currentUser: state.auth.username,
    profilepic: state.auth.profilePic,
    socialComments: state.socialNewsfeed.socialComments,
    commentHost: state.socialNewsfeed.commentHost,
    cellDate: state.socialNewsfeed.cellDate
  }
}

 export default connect(mapStateToProps)(SearchResults);
