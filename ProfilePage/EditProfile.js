import React from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
 import { Avatar, BottomNavigation } from 'react-native-paper';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import { connect } from 'react-redux';
 import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 import BottomSheet from 'reanimated-bottom-sheet';
 import Animated from 'react-native-reanimated';
 import { ArrowUpCircle, Plus, Mail, UserPlus, Send, Image} from "react-native-feather";


 class EditProfile extends React.Component{

   constructor(props){
     super(props);
     this.state = {


     }
   }

   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   renderInner = () => (
    <View style={styles.panel}>
      <Text>Hi</Text>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


   render(){
     let profilePic = '';
     if(this.props.profile_picture){
       profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture
     }

     return (
       <BackgroundContainer>
         <View style={{height:'100%'}}>

           <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.React.createRef().current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/*
              <Avatar
                style={styles.close}
                size={40}
                rounded
                source = {{
                  uri: profilePic
                }}
              />
              */}
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            John Doe
          </Text>
        </View>
           <BottomSheet
            ref={this.bs}
            snapPoints={[330, 0]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
            initialSnap={1}
            callbackNode={this.fall}
            enabledGestureInteraction={true}
          />
           <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,

            ]}
          />
          <TextInput
           placeholder="Username"
           placeholderTextColor="#666666"
           autoCorrect={false}
           style={[
             styles.textInput,

           ]}
         />
           <Text> test</Text>
           {/*
           <Avatar.Image
             source = {{
               uri: this.props.route.params.chatPersonProfilePic
             }}
             size = {50}
              />
          */}

         </View>


      </BackgroundContainer>

     )
   }
 }

export default EditProfile;
  //
  // const mapStateToProps = state => {
  //   return {
  //     userId: state.auth.id,
  //     currentUser: state.auth.username,
  //     profilepic: state.auth.profilePic
  //   }
  // }
  //
  //
  // export default connect(mapStateToProps)(EditProfile);

 const styles = StyleSheet.create({
   textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },

 })
