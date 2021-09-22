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
  Alert,
  TextInput,
  Dimensions,
  RefreshControle
 } from 'react-native';
import { LogOut, Lock, User, Bell, Globe, Menu} from "react-native-feather";
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { Avatar } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { TouchableOpacity as TouchableOpacity1 } from 'react-native-gesture-handler';
const width = Dimensions.get("window").width
const height = Dimensions.get("window").height
class GroupInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      condition:false,
      loading: false,
      username: '',
      loginCondition:true,
    }
    this.bs = React.createRef()
  }

  toggleChange = () => {
    Alert.alert(
      "Are you sure?",
      "This change is irreversible",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Change to public",
          style:'destructive', onPress: () => this.props.openModal(this.props.openNum) }
      ]
    );
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


  renderHeader = () => (
    <View style={styles.test}>
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
    </View>
  );
  render(){
    return(
      <BackgroundContainer>

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
                  source = {{
                    uri:'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
                  }}
                  size={125}
                   />
              </TouchableOpacity>
              <View style={{
                marginTop:10,

                }}>

                  <Text style={{fontSize:22,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>Fitness</Text>
                  <Text style={{fontSize:16,fontFamily:'Nunito-SemiBold', textAlign:'center', }}>349 Members</Text>
               </View>
            </View>
           </View>
           <View style={{ alignItems:'center', marginTop:25}}>
           <Text style={{marginLeft:20,fontSize:18, fontFamily:'Nunito', width:'85%',}}>

        This is the University of Arizona fitness group. Bear Down!
           </Text>
           </View>
           <Text style={styles.settingWord}>

           Add people to orb
           </Text>
            <View style={{
                flexDirection:'row',
                padding:20}}>

                <View style={{marginLeft:20, flexDirection:'column'}}>
                  <Text style={{fontFamily:'Nunito-Bold', fontSize:18}}>Make Orb Public</Text>

                </View>


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


        </View>


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

  settingWord: {
    left:5,
    color:'#919191',
    fontSize:18,
    fontFamily:'Nunito-Bold',
    marginLeft:10,
  },
});
export default GroupInfo;
