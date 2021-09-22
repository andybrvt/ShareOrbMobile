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
  TextInput,
  Dimensions,
  RefreshControle,
  TouchableWithoutFeedback,
  Keyboard
 } from 'react-native';
import { LogOut, Lock, User, Bell, Globe, Menu} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import Camera from './camera.jpg';
import { Avatar } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

class CreateGroupPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      condition:true,
      loading: false,
      username: '',
      loginCondition:true,
      groupPic: "",
      groupName: ""
    }
    this.bs = React.createRef()
  }

  toggleChange = () => {
    this.setState({
      condition: !this.state.condition
    })
  }

  renderInner =()=> {
    return(
      <View>
        {
          Platform.OS ===  'ios' ?
          <View style={styles.panel}>
            <TouchableOpacity
              onPress = {()=>this.handleTakeProfile()}
              style={styles.panelButton} >
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress = {()=>this.handleChooseProfile()}
              style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.panelButton1}
              onPress={() => this.bs.current.snapTo(1)}>
              <Text style={styles.panelButtonTitle1}>Cancel</Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.panel}>
            <TouchableOpacity1
              onPress = {()=>this.handleTakeProfile()}
              style={styles.panelButton} >
              <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity1>
            <TouchableOpacity1
              onPress = {()=>this.handleChooseProfile()}
              style={styles.panelButton}>
              <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity1>
            <TouchableOpacity1
              style={styles.panelButton1}
              onPress={() => this.bs.current.snapTo(1)}>
              <Text style={styles.panelButtonTitle1}>Cancel</Text>
            </TouchableOpacity1>
          </View>
        }
      </View>
    )
  }


  frequentChatPeople=()=>{
    return(

      <View style = {styles.frequentPeopleContainer}>
        <View style={[styles.column]}>
          <Avatar
            rounded
            source = {{
              uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            }}
            size = {70}
          />
        </View>

        <View style={[styles.column]}>
           <Avatar
             rounded
             source = {{
               uri: 'https://images.unsplash.com/photo-1610555248279-adea4c523fb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
             }}
             size = {70}
           />
        </View>
        <View style={[styles.column]}>
          <Avatar
            rounded
            source = {{
              uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
            }}
            size = {70}
          />
        </View>

        <View style={[styles.column]}>
           <Avatar
             rounded
             source = {{
               uri: 'https://images.unsplash.com/photo-1610555248279-adea4c523fb3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
             }}
             size = {70}
           />
        </View>


      </View>

    )
  }
  renderHeader = () => (
    <View style={styles.test}>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
    </View>
  );

  onOutSideClick = () => {
    Keyboard.dismiss()
    this.bs.current.snapTo(1)
  }


  render(){
    return(
      <BackgroundContainer>
        <TouchableWithoutFeedback
          onPress = {() => this.onOutSideClick()}
          >

          <View>
            <View underlayColor="#f0f0f0">
              <View style={{
                  alignItems:'center',
                  justifyContent:'center',
                  flexDirection:'row',

                }}>

                <View style={{flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  width:'100%',
                  // backgroundColor:'red',
                  marginTop:'5%', }}>
                  <TouchableOpacity   onPress={() => this.bs.current.snapTo(0)}>
                    <Avatar
                      rounded
                      source = {Camera}
                      size={100}
                       />
                  </TouchableOpacity>
                  <View style={{
                    marginTop:10,
                    width:'70%',
                    }}>

                      <TextInput
                       placeholder="Orb Name"
                       placeholderTextColor="#919191"
                       autoCorrect={false}
                       style={{fontSize:18,

                         fontFamily:'Nunito-SemiBold', textAlign:'center', }}
                         // onChangeText = {this.handleFirstNameChange}
                         // value = {firstName}
                       />

                   </View>
                </View>
               </View>
               <View style={{
                   flexDirection:'row',
                   padding:25}}>
                   <Menu

                     stroke="black" strokeWidth={2.0} width={25} height={25} style={{top:3}}/>
                   <TextInput
                    placeholder="Description"
                    placeholderTextColor="#919191"
                    autoCorrect={false}
                    style={{marginLeft:20,fontSize:18, fontFamily:'Nunito-SemiBold', width:'85%',}}
                      // onChangeText = {this.handleFirstNameChange}
                      // value = {firstName}
                    />

                </View>
                <View style={{
                    flexDirection:'row',

                    borderTopWidth:1,
                    borderColor:'#d9d9d9',
                    borderBottomWidth:1,
                    padding:20}}>
                  <View>
                    <Globe stroke="black" strokeWidth={1} width={45} height={45} style={{top:3}}/>
                  </View>
                  {
                    (this.state.condition)?
                    <View style={{marginLeft:20, flexDirection:'column'}}>
                      <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>Make Orb Public</Text>
                      <Text style={{fontFamily:'Nunito-SemiBold', fontSize:18, color:'#108EE9'}}>Anyone can join the group</Text>
                    </View>
                    :
                    <View style={{marginLeft:20, flexDirection:'column'}}>
                      <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>Make Orb Private</Text>
                      <Text style={{fontFamily:'Nunito-SemiBold', fontSize:18, color:'#108EE9'}}>Choose who joins the group</Text>
                    </View>
                  }

                  <View style = {{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {
                      this.state.loading === true ?
                      <ActivityIndicator />
                    :

                    <Switch
                      trackColor={{ false: "gray", true: "#1890ff" }}
                      thumbColor={this.state.condition ? "white" : "white"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={this.toggleChange}
                      value={this.state.condition }
                       />

                    }

                  </View>


                 </View>
                <View style={{top:20}}>
                  <Text style={styles.settingWord}>People in Group</Text>
                </View>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal = {true}>
                  {this.frequentChatPeople()}
                </ScrollView>

            </View>

             <View style={{alignItems:'center', top:'7.5%'}}>
             <View style={styles.loginBtn1}>
               <Text style={{color:'white', fontSize:16, fontFamily:'Nunito-Bold'}}> CREATE GROUP</Text>
             </View>
             </View>



          </View>

        </TouchableWithoutFeedback>

        <BottomSheet
         ref={this.bs}
         snapPoints={[250, 0]}
         renderContent={this.renderInner}
         renderHeader={this.renderHeader}
         initialSnap={1}
         callbackNode={this.fall}
         enabledGestureInteraction={true}
       />
      </BackgroundContainer>
    )
  }
}
const styles = StyleSheet.create({
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    zIndex:9999,
    elevation:40,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelButtonTitle: {
    color:'white'
  },
  panelButton: {
   padding: 13,
   borderRadius: 10,
   backgroundColor: '#1890ff',
   alignItems: 'center',
   marginVertical: 7,
   },
  panelButton1: {
  padding: 13,
  borderRadius: 10,
  backgroundColor: '#F0F0F0',
  alignItems: 'center',
  marginVertical: 7,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.2,

    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    // backgroundColor:'blue',
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  test: {
    elevation:5,
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

  loginBtn1: {
    width: "85%",
    borderRadius: 35,
    height: 60,
    // elevation:20,
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#40a9ff",
  },

  settingWord: {
    left:5,
    color:'#919191',
    fontSize:18,
    fontFamily:'Nunito-Bold',
    marginLeft:10,
  },
});
export default CreateGroupPage;
