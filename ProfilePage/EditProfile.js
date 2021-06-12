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
import { Avatar } from 'react-native-elements';
 // this class will be a page on its own where
 // you can upload pictures and write a caption after uploaidng
 // pictures
 import { connect } from 'react-redux';
 import BackgroundContainer from '../RandomComponents/BackgroundContainer';
 import BottomSheet from 'reanimated-bottom-sheet';
 import Animated from 'react-native-reanimated';
 import { Bell, User} from "react-native-feather";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as dateFns from 'date-fns';



 class EditProfile extends React.Component{
   constructor(props){
     super(props);
     this.bs = React.createRef();
     this.state = {
       date:'',

     }
   }


   onHomeNav = () => {
     // this function will be use to navigate back
     // to the home page
   }

   renderInner = () => (
     <View style={styles.panel}>
       <View style={{alignItems: 'center'}}>
         <Text style={styles.panelTitle}>Upload Photo</Text>
         <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
       </View>
       <TouchableOpacity style={styles.panelButton} >
         <Text style={styles.panelButtonTitle}>Take Photo</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.panelButton}>
         <Text style={styles.panelButtonTitle}>Choose From Library</Text>
       </TouchableOpacity>
       <TouchableOpacity
         style={styles.panelButton}
         onPress={() => this.bs.current.snapTo(1)}>
         <Text style={styles.panelButtonTitle}>Cancel</Text>
       </TouchableOpacity>
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
     let firstName='';
     let lastName='';
     let username='';
     let profilePic = '';
     if(this.props.profile_picture){
       profilePic = `${global.IMAGE_ENDPOINT}`+this.props.profile_picture
     }
     if(this.props.firstName){
       firstName = this.props.firstName
     }
     if(this.props.lastName){
       lastName = this.props.lastName
     }
     if(this.props.username){
       username = this.props.username
     }


     return (
       <BackgroundContainer>
         <View style={{height:'100%'}}>

           <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                top:10,

                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',

              }}>

                <Avatar
                  size={95}
                  rounded
                  source={{
                    uri:
                      profilePic,
                  }}
                />
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {firstName+" "+lastName}
          </Text>
          <Text style={{ fontSize: 15, color:'gray'}}>
            @{username}
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
        <View style={styles.action}>
          <User
            style={{marginleft:10}}
            stroke="black" strokeWidth={2.5} width={17.5} height={17.5} />

           <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,

            ]}
          >
          {
              (firstName&&lastName)?
              <Text>
                {firstName+" "+lastName}
              </Text>
              :
              ''
          }
        </TextInput>
        </View>
        <View style={styles.action}>
          <TextInput
           placeholder="Username"
           placeholderTextColor="#666666"
           autoCorrect={false}
           style={[
             styles.textInput,

             ]}>
             {
                 (username)?
                 <Text style={{color:'black'}}>
                   {username}
                 </Text>
                 :
                 ''
             }

           </TextInput>
       </View>

       <View style={styles.action}>
         <TextInput
          placeholder="Bio"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={[
            styles.textInput,

          ]}
        />
      </View>





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

// export default EditProfile;
  //
  const mapStateToProps = state => {
    return {
      firstName:state.auth.firstName,
      lastName:state.auth.lastName,
      username:state.auth.username,
      userId: state.auth.id,
      currentUser: state.auth.username,
      profile_picture: state.auth.profilePic
    }
  }


  export default connect(mapStateToProps, null)(EditProfile);

 const styles = StyleSheet.create({
   action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
   panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
    },
   textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    paddingLeft: 10,

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
