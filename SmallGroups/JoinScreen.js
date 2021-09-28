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

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' },,
  // { key: 'K' },
  // { key: 'L' },
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
    console.log(item)
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View
        style={styles.item}
      >

      <Image style={{width:'100%', height:'100%'}}
       source={{uri:'https://images.unsplash.com/photo-1564419320415-7f119406236e?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80'}}/>
     <Text style={styles.itemText}>{item.key}dd</Text>
      </View>
    );
  };

   render(){
     let codeInvite=this.props.codeInvite
     let group = {}
     if(this.props.route.params.item){
       group = this.props.route.params.item
     }
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

             stroke="black"
             height = {25}
             width = {25}
             />
         </TouchableOpacity>


         <View style = {{flex: 1}} >

           <View style = {{

               flex:2.5,
               backgroundColor: 'pink',

               alignItems: 'center',
               justifyContent: 'center'
             }}>

             <View style = {{
               }}>
               <Avatar
                 rounded
                 source = {{
                   uri:`${global.IMAGE_ENDPOINT}`+group.groupPic
                 }}
                 size={125}
                  />
             </View>

             <View>
               <Text style={{fontSize:22,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{global.CAPITALIZE(group.group_name)}</Text>

                 {
                   group.public ?

                   <View style={styles.loginBtn0}>
                     <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold', padding:5}}>Public Orb</Text>
                   </View>

                   :

                   <View style={styles.loginBtn0}>
                     <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold', padding:5}}>Private Orb</Text>
                   </View>


                 }

                 <TouchableOpacity onPress = {()=>this.navPeopleInGroup()}>
                   <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>{group.members.length} Members </Text>
                 </TouchableOpacity>


             </View>



              <View style={{
                alignItems:'center',
                }}>
                <Text style={{fontSize:18, fontFamily:'Nunito'}}>

                  {group.description}

                </Text>
              </View>


           </View>

           <View style = {{
               flex: 2.5,
               backgroundColor: 'yellow',
               alignItems:'center'
             }}>
             <Text>Recent picturesss</Text>
             <View style={styles.testShadow}>

               <FlatList
                  data={formatData(data, numColumns)}

                  renderItem={this.renderItem}
                  numColumns={numColumns}
                />

             </View>


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


                   <View style={styles.loginBtn0}>
                      <Text style={{color:'white', fontSize:18, fontFamily:'Nunito-Bold', padding:10}}>Join</Text>
                   </View>

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
    backgroundColor: '#4D243D',
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
     width:'50%',
     backgroundColor: "#1890ff",
   },
   joinButton: {

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
   joinText:{
     color: 'white',
     fontSize: 15
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
