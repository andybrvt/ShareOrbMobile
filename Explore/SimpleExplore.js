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
   Modal,
   Keyboard,
   TouchableOpacity
  } from 'react-native';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import MainLogo from '../logo.svg';
import { MapPin,Bell,ArrowUpCircle, Plus, PlusCircle, Search, Mail, UserPlus, Globe } from "react-native-feather";
import { connect } from 'react-redux';
import authAxios from '../util';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
class SimpleExplore extends React.Component{


  constructor(props){
    super(props)

    this.state = {
      orbs: [],
      businessCondition:false,
    }

  }

  onGroupDirect = (item) => {
    this.props.navigation.navigate("groupOrb", {
      creator: item.creator,
      orbId: item.id,
      groupName: item.group_name,
      groupPic: item.groupPic
    })
  }


  onShowBusinessCondition = () => {
    this.setState({
      businessCondition: !this.state.businessCondition,
    })
  }

  renderItem = ({item}) => {
    return(
      <TouchableOpacity
        onPress = {() => this.onGroupDirect(item)}
        style={{flexDirection:'row',padding:5, padding:20, alignItems:'center',
          borderBottomWidth:1, borderBottomColor: '#f2f2f2',
        }}>

        <Avatar
          size={50}
          rounded
            resizeMode = "cover"
            source = {{
              uri: `${global.IMAGE_ENDPOINT}`+item.groupPic
            }}
           />
         <View style={{marginLeft:10}}>
         <Text style={{fontSize:16, fontFamily:'Nunito-SemiBold'}}>{item.group_name}</Text>
         <View style={{flexDirection:'row', alignItems:'center'}}>
           <MapPin
             style={{ marginRight:3}}
             stroke="gray" strokeWidth={2} width={12.5} height={12.5} />
           <Text style={{fontSize:15, color:'#8c8c8c', fontFamily:'Nunito'}}>Tucson, Arizona</Text>
         </View>

       </View>

     </TouchableOpacity>
    )
  }

  componentDidMount(){

    authAxios.get(`${global.IP_CHANGE}`+'/mySocialCal/getRandomOrbs')
    .then(res => {
      this.setState({
        orbs: res.data
    })
    })
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
          style = {{flex: 1, }}
          data = {this.state.orbs}
          renderItem = {this.renderItem}
          keyExtractor={(item, index) => String(index)}
          // onRefresh = {() => this.onRefresh()}

           />
           <TouchableOpacity style = {{
               position: 'absolute',
               alignSelf: 'center',
               bottom: '5%',
             }}
             onPress={() => this.onShowBusinessCondition()}
             >
             <View style = {styles.roundButton}>
               <PlusCircle
                 stroke = "white"
                 width = {40}
                 height = {40}
                  />
             </View>
            </TouchableOpacity>


            <Modal
               animationType="fade"
               transparent
               visible={this.state.businessCondition}
               presentationStyle="overFullScreen"
                >
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <TextInput
                          placeholderTextColor="gray"

                           placeholder="Enter Group Code..."
                           value={this.state.inputValue}
                           style={styles.textInput}
                           onChangeText={(value) =>
                               this.setState({
                               inputValue:value
                             })
                           } />
                         <View style={{flexDirection:'row', marginTop:25, alignItems:'flex-end'}}>
                           <TouchableOpacity onPress={this.onShowBusinessCondition} style={styles.cancelButton}>
                             <Text style={{color:'white'}}>Cancel</Text>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={this.onSubmitCreateOrb} style={styles.cancelButton}>
                             <Text style={{color:'white'}}>Submit</Text>
                           </TouchableOpacity>
                        </View>
                  </View>
                </View>
            </Modal>
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
  cancelButton: {
    marginRight:10,
    borderRadius: 5,
    padding:10,
    elevation:5,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    flexDirection:'row'
  },
  viewWrapper: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: "50%",
      left: "50%",
      elevation: 5,
      transform: [{ translateX: -(width * 0.4) },
                  { translateY: -90 }],
      height: 180,
      width: width * 0.8,
      backgroundColor: "#fff",
      borderRadius: 7,
  },
  textInput: {
      width: "80%",
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderColor: "rgba(0, 0, 0, 0.2)",
      borderWidth: 1,
      marginBottom: 8,
  },
  roundButton: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
    shadowColor: '#333333',
    shadowOffset: {width: 1, height: 3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 20,
    backgroundColor: '#1890ff',
  },
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
