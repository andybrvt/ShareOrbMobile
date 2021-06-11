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
 import { Bell} from "react-native-feather";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

 class EditProfile extends React.Component{
   constructor(props){
     super(props);
     this.bs = React.createRef();
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
     let profilePic = '';
     console.log("edit!!!")
     console.log(this.props)
     if(this.props.profile_picture){
       profilePic = `${global.IMAGE_ENDPOINT}`+this.props.data.owner.profile_picture
     }

     return (
       <BackgroundContainer>
         <View style={{height:'100%'}}>

           <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:'red',
              }}>

              <Bell stroke="black" strokeWidth={2.5} width={20} height={20} />
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
  // export default connect(mapStateToProps, null)(EditProfile);

 const styles = StyleSheet.create({
   panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
    },
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
