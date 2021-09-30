import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Switch,
  Share,
  Alert,
  TextInput,
  Dimensions,
  RefreshControle,
  ActivityIndicator
 } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as dateFns from 'date-fns';
import { ArrowRightCircle, ArrowLeftCircle, Plus, Mail, UserPlus, CheckCircle, ArrowLeft } from "react-native-feather";
import { Avatar } from 'react-native-elements';
import authAxios from '../util';
import { LogOut, Lock, User, Bell, Globe, ArrowRight, Menu} from "react-native-feather";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { connect } from "react-redux";
import * as authActions from '../store/actions/auth';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import FacePile from 'react-native-face-pile';
import { BlurView } from 'expo-blur';

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' },
  { key: 'K' },
  { key: 'L' },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;
const FACES = [
  {
    id: 0,
    imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1611774812120-79d97450b31c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1581921028607-02e45c6e232c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1054&q=80',
  }
];


class JoinScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      invitedPeople:[],
      inviteCode: '',
      loading: false
    }
  }

  onSelectUser = (user) => {
    if(this.state.invitedPeople.some(item => user.username == item.username)){
      const newList = this.state.invitedPeople.filter(function(el) { return el.username != user.username });
      this.setState({
        invitedPeople: newList
      })
    }
    else{
      this.setState({
        invitedPeople: [...this.state.invitedPeople, user],
      })
    }
  }

  componentDidMount() {

  }

  navPeopleInGroup = (groupId) => {
    this.props.navigation.navigate("PeopleInGroup", {groupId: groupId })
  }

  handleCode = (e) => {
    this.setState({
      inviteCode:e
    })
  }

  // joinPrivateGroup = (groupId) => {
  //
  //   // Probally gonna put a authaxios call on this instead of
  //   // just checking the code in an of itself instead of just
  //   // checking if its right or worg
  //   console.log(this.state.inviteCode)
  //
  //   console.log(groupId, groupCode)
  //
  //   const userId = this.props.id
  //   this.setState({
  //     loading: true
  //   })
  //
  //   authAxios.post(`${global.IP_CHANGE}`+"/mySocialCal/joinSmallGroup/"+groupId+'/'+userId)
  //   .then(res => {
  //     console.log(res.data)
  //     // direct this group to newsfeed and then add it to auth
  //
  //     this.setState({
  //       loading: false
  //     })
  //     this.props.authAddSmallGroup(res.data)
  //
  //     this.props.navigation.navigate('Home')
  //
  //   })
  //
  //
  // }

  declineGroup = () => {
    this.props.navigation.goBack()
  }

  joinGroup = (groupId) => {
    const userId = this.props.id
    this.setState({
      loading: true
    })
    // for this you just need group id and userid
    authAxios.post(`${global.IP_CHANGE}`+"/mySocialCal/joinSmallGroup/"+groupId+'/'+userId)
    .then(res => {
      // direct this group to newsfeed and then add it to auth
      this.setState({
        loading: false
      })
      this.props.authAddSmallGroup(res.data)
      this.props.navigation.navigate('Home')
    })
  }


  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >

      <Image style={{width:'100%', height:'100%'}}
        source = {{
          uri: `${global.IMAGE_ENDPOINT}`+item.itemImage
        }}
       />

      </View>
    );
  };

   render(){
     let codeInvite=this.props.codeInvite
     let group = {}
     let imageList = []
     let likeAvatarList=[]
     if(this.props.route.params.item){
       group = this.props.route.params.item
     }
     if(this.props.route.params.item){
       imageList = this.props.route.params.item.get_socialCalItems
     }
     console.log("LOLLLLLLLLLLLLLLLLL")
     if(group.mini_member){
       likeAvatarList = group.mini_member.map(item => {
        return {
          imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
        };
        });
     }

     // if(this.props.data.people_like.length>0)
     // {
     //   likeAvatarList = this.props.data.people_like.map(item => {
     //    return {
     //      imageUrl: `${global.IMAGE_ENDPOINT}`+item.profile_picture,
     //    };
     //    });
     // }



     return(
       <SafeAreaView style = {{flex: 1}}>

         <TouchableOpacity
           style={{
             position: 'absolute',
             top: '5%',
             left: '5%',
             zIndex: 999
           }}
           onPress = {() => this.props.navigation.goBack(0)}
           >

           <ArrowLeft
             stroke="white"
             height = {25}
             width = {25}
             />
         </TouchableOpacity>


         <View>

           <ImageBackground
             source = {{
               uri:`${global.IMAGE_ENDPOINT}`+group.groupPic
             }}
             style = {{
               // flex:2.5,
               height:'100%',
               alignItems: 'center',
               justifyContent: 'center'
             }}>

             <BlurView intensity={90} tint="dark" style = {{
                 backgroundColor:'#f0f0f0',
                 width:'100%',
                 height:'100%',
                 alignItems:'center',

               }}>
               <View style={{flex:1.25,  justifyContent:'center'}}>
                 <View style={{zIndex:99, borderWidth: 2, borderColor: 'white', borderRadius:75,}}>
                   <Avatar
                     rounded
                     source = {{
                       uri:`${global.IMAGE_ENDPOINT}`+group.groupPic
                     }}
                     size={125}
                      />
                  </View>
                </View>
                <View style={{alignItems:'center',flex:1.5}}>
                  <Text style={{color:'white',fontSize:28,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{global.CAPITALIZE(group.group_name)}</Text>
                    {
                      group.public ?
                      <View style={styles.loginBtn0}>
                        <Text style={{color:'white', fontSize:14, fontFamily:'Nunito-Bold', padding:5}}>Public Orb</Text>
                      </View>

                      :
                      <View style={styles.loginBtn0}>
                        <Text style={{color:'white', fontSize:14, fontFamily:'Nunito-Bold', padding:5}}>Private Orb</Text>
                      </View>
                    }
                  <View style={{marginTop:'5%',}}>
                    { (group.members.length)==0?
                      <TouchableOpacity onPress = {()=>this.navPeopleInGroup(group.id)}>
                        <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{group.members.length} Members </Text>
                      </TouchableOpacity>

                      :
                      <TouchableOpacity activeOpacity={0.9} onPress = {()=>this.navPeopleInGroup(group.id)}>
                        <FacePile numFaces={3} faces={likeAvatarList} overlap={1}
                           circleSize={12.5} />
                       </TouchableOpacity>
                    }
                  </View>
                   <View style={{
                     alignItems:'center',
                     marginTop:'5%',
                     width:'80%',

                     }}>
                     <Text style={{color:'white',fontSize:18, fontFamily:'Nunito-SemiBold'}}>

                       {group.description}

                     </Text>
                   </View>
                   </View>
                   <View style={{flex:1, width:'100%', alignItems:'center'}}>
                   {
                     this.state.loading ?
                     <ActivityIndicator />
                    :
                     group.public ?
                     <TouchableOpacity
                       onPress = {() => this.joinGroup(group.id)}
                       style = {styles.joinButton}>
                       <View >
                         <Text style = {styles.joinText}>Join</Text>
                       </View>
                     </TouchableOpacity>
                     :
                     <View style = {styles.inputHolder}>
                       <View style = {styles.buttonHolder}>
                           <TouchableOpacity
                             onPress = {() => this.joinPrivateGroup(group.id, group.groupCode)}
                             style = {styles.declineButton}>
                               <Text style = {styles.joinText}>Join</Text>
                             </TouchableOpacity>
                       </View>
                       <View style = {styles.buttonHolder}>
                           <TouchableOpacity
                             onPress = {() => this.joinPrivateGroup(group.id, group.groupCode)}
                             style = {styles.acceptButton}>
                               <Text style = {styles.joinText}>Join</Text>
                             </TouchableOpacity>
                       </View>
                     </View>
                   }
                   </View>
             </BlurView>
           </ImageBackground>

           <View>
             {/*
           {group.public?
             <View style={{flex:2}}>
             <FlatList
               style={{position:'relative', top:0}}
               data={formatData(imageList, numColumns)}
               renderItem={this.renderItem}
               numColumns={numColumns}
             />
             </View>

           :
            <View></View>

            }
            */}
            </View>
           <View style = {{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
             }}>




               {
                 group.public ?

                 <View style = {{
                     flex:1,
                     alignItems:'center',
                     backgroundColor: 'orange'
                   }}>




                 </View>

                 : null

               }



           {/*
           <View style = {{top: '10%'}}>
             <View style={{
                 alignItems:'center',
                 top:'15%'}}>
               {
                 this.state.loading ?
                 <ActivityIndicator />
                :
                 group.public ?
                 <TouchableOpacity
                   onPress = {() => this.joinGroup(group.id)}
                   style = {styles.joinButton}>
                   <View >
                     <Text style = {styles.joinText}>Join</Text>
                   </View>
                 </TouchableOpacity>
                 :
                 <View style = {styles.inputHolder}>
                   <View style = {styles.buttonHolder}>
                       <TouchableOpacity
                         onPress = {() => this.joinPrivateGroup(group.id, group.groupCode)}
                         style = {styles.declineButton}>
                           <Text style = {styles.joinText}>Join</Text>
                         </TouchableOpacity>
                   </View>
                   <View style = {styles.buttonHolder}>
                       <TouchableOpacity
                         onPress = {() => this.joinPrivateGroup(group.id, group.groupCode)}
                         style = {styles.acceptButton}>
                           <Text style = {styles.joinText}>Join</Text>
                         </TouchableOpacity>
                   </View>
                 </View>
               }
             </View>
             <View>
               {
                 group.public ?
                 <View>
                   <Text>put the pictures of the group</Text>
                 </View>
                 :null
               }
             </View>
           </View>
           */}
         </View>


          </View>

       </SafeAreaView>
     )
   }
 }

 const styles = StyleSheet.create({
   container: {
     paddingTop:20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  background1: {
    height:75,
    position:'relative',
    top:'20%',

  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
   testShadow:{
     width:'100%',
     height:'100%',
     shadowColor: "#000",
 shadowOffset: {
 	width: 0,
 	height: 1,
 },
 shadowOpacity: 0.20,
 shadowRadius: 1.41,

 elevation: 2,
   },
   container: {
    width:'100%',
    height:'100%',
    marginVertical: 20,
  },
  item: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    width:90,
    height:90,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
   inputHolder:{
     flex: 1,
     // backgroundColor: 'red',
     alignItems: 'center',
     flexDirection: 'row',
   },
   inviteInput: {
     width: '100%',
     height: 50,
     backgroundColor:'#d9d9d9',
     fontFamily:'Nunito',
     borderRadius:10,
     padding:10,
     fontSize:18,
     marginBottom: 20
   },

   loginBtn0: {

     borderRadius: 10,
     // elevation:20,
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10,
     alignItems: "center",
     justifyContent: "center",
     width:'25%',
     marginTop:'5%',
     backgroundColor: "#1890ff",
   },
   joinButton: {

     width: '60%',
     backgroundColor: "#1890ff",
     justifyContent: 'center',
     alignItems: 'center',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10,
     borderRadius: 25,


   },
   joinText:{
     color: 'white',
     fontSize: 15,
     fontFamily:'Nunito-SemiBold',
     padding:15,
   },
   buttonHolder:{
     height: 50,
     width: '50%',
     alignItems: 'center'
   },
   acceptButton: {
     width: '70%',
     backgroundColor: "#1890ff",
     justifyContent: 'center',
     alignItems: 'center',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10,
     borderRadius: 20,
     height: 50,

   },
   declineButton: {
     width: '70%',
     backgroundColor: "red",
     justifyContent: 'center',
     alignItems: 'center',
     textShadowColor: 'black',
     textShadowOffset: {width: -1, height: 1},
     textShadowRadius: 10,
     borderRadius: 20,
     height: 50,

   },
   bottomContainer: {
     height: '25%',
     width: width,
     flexDirection:'row'
   },
   frequentPeopleContainer: {
     marginLeft:10,
     marginTop:20,
     height: 100,
     flexDirection: 'row',
   },
   column:{
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',       //THIS LINE HAS CHANGED
     marginRight:30,
     justifyContent:'center',

   },

   settingWord: {
     left:5,
     color:'#919191',
     fontSize:18,
     fontFamily:'Nunito-Bold',
     marginLeft:10,
   },
 })

const mapStateToProps = state => {
  return{
    id: state.auth.id
  }
}

const mapDispatchToProps = dispatch => {
  return{
    authAddSmallGroup: (group) => dispatch(authActions.authAddSmallGroup(group))
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(JoinScreen);
