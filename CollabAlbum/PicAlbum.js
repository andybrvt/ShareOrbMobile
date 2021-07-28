import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  Switch,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image
 } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
 import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import BackgroundContainer from '../RandomComponents/BackgroundContainer';
import { ArrowRight,PlusCircle, XCircle, Unlock, Lock, Users, X, Search, Edit2, Navigation2} from "react-native-feather";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import { moderateScale } from 'react-native-size-matters';
import { SCREEN_HEIGHT, SCREEN_WIDTH, MAX_PIC} from "../Constants";
import ColabAlbumWebsocketInstance from '../Websockets/colabAlbumWebsocket';
import { connect } from 'react-redux';
import * as colabAlbumActions from '../store/actions/colabAlbum';
import * as ImagePicker from 'expo-image-picker';
import  authAxios from '../util';


const width=SCREEN_WIDTH;
const coverScale = 1.7;
const col = 3;



const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const data = [
  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
];

const numColumns=3;

class PicAlbum extends React.Component{
  constructor(props){
    super(props);
    this.initaliseColabAlbum()
    this.state = {
      tempPictures: []
    }
  }

  initaliseColabAlbum(){
      const albumId = this.props.route.params.albumId

      this.waitForAlbumSocketConnection(() => {
        ColabAlbumWebsocketInstance.fetchAlbums(albumId)
      })

      ColabAlbumWebsocketInstance.connect(albumId)
  }

  waitForAlbumSocketConnection(callback){
    const component = this;
    setTimeout(
      function(){

        if (ColabAlbumWebsocketInstance.state() === 1){

          callback();
          return;
        } else{
            component.waitForAlbumSocketConnection(callback);
        }
      }, 100)
  }

  componentWillUnmount(){
    ColabAlbumWebsocketInstance.disconnect();
  }

  renderSave = () => {

    return (
      <View style={{right:10}}>
      <TouchableOpacity
        >
        <Button

          title = "Save"
          onPress = {() => this.onSaveAlbum()}

           />
      </TouchableOpacity>
      </View>
    )
  }

  handleChoosePhoto = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted == false){
      alert("Permission to access camera roll is required!");
      return;
    }

    let  pickerResult = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.All,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
     allowsMultipleSelection: true,
     base64: true,
    });

    if(!pickerResult.cancelled){
      // const imageUri = global.FILE_NAME_GETTER(pickerResult.uri).uri
      const list = [...this.state.tempPictures, pickerResult.uri]
      this.setState({
        tempPictures: list
      })

      this.props.navigation.setOptions({
        headerRight: () => this.renderSave()
      })

    }

  }

  onSaveAlbum = () => {
    // this function is used to save the images in the ablum
    // to the websockets
    // you just need the album, list of images
    // do it through views and then just send it normally through
    // websockets
    const albumId = this.props.colabAlbum.id;
    const fileList = this.state.tempPictures;
    const formData = new FormData();
    const userId = this.props.userId

    for(i = 0; i< fileList.length; i++){
      const filePackage = global.FILE_NAME_GETTER(fileList[i])
      formData.append("image["+i+"]", filePackage)
    }
    formData.append('length', fileList.length)

    this.setState({
      tempPictures: []
    })
    this.props.navigation.setOptions({
      headerRight: null
    })
    authAxios.post(`${global.IP_CHANGE}/colabAlbum/uploadColabAlbum/`+userId+"/"+albumId,
      formData,
    ).then( res => {
      ColabAlbumWebsocketInstance.fetchAlbums(albumId)


    })



  }



  renderItem = ({ item, index }) => {

    // if (item.empty === true) {
    //   return <View style={[styles.item, styles.itemInvisible]} />;
    // }
    if(item.itemImage){
      return (
        <View
          style={styles.item}
        >
          <Image
            style ={{
              width: "100%",
              height: '100%'
            }}
            resizeMode = "cover"
            source = {{
              uri: `${global.IMAGE_ENDPOINT}` + item.itemImage
            }}
             />

        </View>
      );
    } else {
      return (
        <View
          style={styles.item}
        >
          <Image
            style ={{
              width: "100%",
              height: '100%'
            }}
            resizeMode = "cover"
            source = {{
              uri: item
            }}
             />

        </View>
      );
    }

  };

   render(){

     let currentAlbum = [];
     if(this.props.colabAlbum){
       if(this.props.colabAlbum.get_colabItems){
          currentAlbum = this.props.colabAlbum.get_colabItems
       }

     }
     const {tempPictures} = this.state;

     let finalAlbum = [...currentAlbum, ...tempPictures];

     return (
       <BackgroundContainer>

         {/*
           <View style={{flexDirection:'row'}}>
             <View style={{alignItems:'center', top:'12.5%', flex:1}}>
                <Text style={{fontSize:18, bottom:30}}>Cover Pic</Text>
                <View style={styles.bigImageContainer}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress = {this.handleChoosePhoto}
                    style = {styles.addSmallImage}>
                    <PlusCircle
                      height = {50}
                      width = {50}
                      stroke = "lightgray"
                      fill= "white" />

                  </TouchableOpacity>

                </View>
             </View>
             <View style={{top:'10%'}}>
               <PlusCircle
                 style={{right:'50%', top:'25%'}}
                 width={35} height={35}
                 stroke = "black"
                 fill= "white" />
               <Edit2
                 style={{right:'50%', top:'35%'}}
                 stroke="black" strokeWidth={2.5} width={30} height={30} />
             <Navigation2
               style={{right:'50%', top:'50%'}}
               stroke="black" strokeWidth={2.5} width={30} height={30} />
             </View>
           </View>
           <View style={{top:'30%', height:'100%'}}>
             <ScrollView>
               <FlatList
                data={formatData([
                  { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
                ], 3)}
                style={styles.container}
                renderItem={this.renderItem}
                numColumns={3}
              />
            </ScrollView>
          </View>


           */}

           <FlatList
             data = {finalAlbum}
             renderItem = {this.renderItem}
             numColumns = {3}
             keyExtractor={(item, index) => String(index)}

              />


            <TouchableOpacity
              onPress = {() => this.handleChoosePhoto()}
              >
              <View style = {{
                  backgroundColor: '#1890ff',
                  alignSelf: 'center',
                  padding: 15,
                  borderRadius: 15
                }}>
                <Text style = {{color:'white'}}>Add pictures here</Text>
              </View>
            </TouchableOpacity>







       </BackgroundContainer>
     )
   }
 }
 const styles = StyleSheet.create({
   container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // margin: 1,
    padding: 1,
    width: width/3,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
   addSmallImage: {
     width: "80%",
     height: "80%",
     borderWidth: 3,
     borderRadius: 15,
     borderStyle: 'dashed',
     borderColor: 'lightgray',
     alignItems: "center",
     justifyContent: "center"
     // backgroundColor: 'lightgray'

   },
   bigImageContainer:{
     width: Math.round(SCREEN_WIDTH/3)*coverScale,
     height: Math.round(SCREEN_WIDTH/3)*coverScale,
     // backgroundColor:'red',
     overflow:"hidden",
     alignItems: 'center',
     justifyContent: "center",
     position: "absolute",
     shadowColor:'black',
     shadowOffset:{width:0,height:2},
     shadowOpacity:0.2,
   },
   searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
},

 })

const mapStateToProps = state => {
  return {
    colabAlbum: state.colabAlbum.curColabAlbum,
    userId: state.auth.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unfetchColabAlbum: () => dispatch(colabAlbumActions.unfetchColabAlbum())
  }
}

 export default connect(mapStateToProps, mapDispatchToProps)(PicAlbum);
