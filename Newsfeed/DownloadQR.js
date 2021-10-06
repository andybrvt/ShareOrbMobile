import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  Switch,
  Share,
  Alert,
  TextInput,
  Dimensions,
  RefreshControle,
  ActivityIndicator,
  Clipboard
 } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const {width, height} = Dimensions.get('screen')


 class DownloadQR extends React.Component{

   render(){
     return(
       <View style = {{
           alignItems: 'center',
           justifyContent: 'center',
           flex: 1,
           backgroundColor: 'white'}}>
           <Text style = {{
               fontSize: 40,
               color: '#1890ff',
               position: 'absolute',
               top: '10%'
             }}>Share the Orb</Text>

           <View style ={{
              top: '30%',
              }}>

             <ScrollView
               horizontal= {true}
               >
               <View style = {{
                   alignItems: 'center',
                    width: width}}>

                 <Text style = {{
                     fontSize: 30
                   }}>IOS</Text>
                 <QRCode
                    value = {"https://testflight.apple.com/join/v58j1FSw"}
                    size = {270}
                    />

               </View>

                <View style = {{
                    alignItems:'center',
                      width: width}}>
                  <Text style = {{
                      fontSize: 30
                    }}>Android</Text>
                  <QRCode
                     value = {"https://play.google.com/store/apps/details?id=com.pinghsu520.ShareOrbMobile"}
                     size = {270}
                     />

                </View>





             </ScrollView>




           </View>

           <Text style = {{
               position: 'absolute',
               bottom: '10%',
               zIndex: 999
             }}>Swipe for android</Text>
       </View>
     )

   }

 }

 export default DownloadQR;
