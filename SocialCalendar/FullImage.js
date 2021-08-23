import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
 } from 'react-native';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import ImageZoom from 'react-native-image-pan-zoom';
import { ArrowLeft } from "react-native-feather";
 class FullImage extends React.Component{

   constructor(props) {
    super(props);
    this.state = {
      zooming: false,
    };
   }



   render(){
     let imageInfo = this.props.route.params.imageInfo
     console.log("BBBBBBBBBBBBb")
     console.log(imageInfo)
     return (
       <BackgroundContainer>
         <View style={{backgroundColor:'black', justifyContent:'center'}}>





           <ImageZoom
             style={{paddingBottom: Platform.OS === 'ios' ? '' : '10%'}}
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={Dimensions.get('window').width}
              imageHeight={Dimensions.get('window').height}
            >
                <TouchableOpacity style={{left:'5%', top:'10%', zIndex:99}}
                onPress = {() => this.props.navigation.goBack(0)}>

                    <ArrowLeft
                      height = {40}
                      width = {40}
                      strokeWidth={3}
                      stroke = "white"
                      />

                </TouchableOpacity>
               <Image style={{width:'100%', height:'100%'}}
                      source={{uri:`${global.IMAGE_ENDPOINT}`+imageInfo.itemImage}}/>
           </ImageZoom>
         </View>
       </BackgroundContainer>

     )
   }
 }

 export default FullImage;
