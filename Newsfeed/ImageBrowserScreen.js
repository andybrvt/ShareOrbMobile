import React from 'react';
import {
  Text,
  View,
  Button,
  ActivityIndicator,
 } from 'react-native';
// import { ImageBrowser } from 'expo-image-picker-multiple';
import * as ImageManipulator from 'expo-image-manipulator';


class ImageBrowserScreen extends React.Component{

  // Ths iwll handle changes in images picked
  updateHandleer = (count, onSubmit) => {
    this.props.navigation.setOptions({

    })
  }

  getHeaderLoader = () => {
    <ActivityIndicator size = "small" color = {"#0580FF"} />
  }

  imgaesCallback = (callback) => {
    const {navigation} = this.props;
    this.props.navigation.setOptions({
      headerRight: () => this.getHeaderLoader()
    })

    // This will be a promise
    callback.then( async (photos) => {
      const cPhotos = []


      for(let photo of photos){
        const pPhoto = await this.processImageAsync(photo.uri);
        cPhotos.push({
          uri: pPhoto.uri,
          name: photo.filename,
          type: "image/jpg"
        })
      }

      navigation.navigate("PostingPage", {photos: cPhotos});
    })
    .catch((e) => console.log(e));
  }

  async processImageAsync(uri){
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: { width: 1000 }}],
     { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
   );
   return file;

  }


  renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity title={'Done'} onPress={onSubmit}>
      <Text onPress={onSubmit}>Done</Text>
    </TouchableOpacity>
  }

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => this._renderDoneButton(count, onSubmit)
    });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );




  render(){

    const emptyStayComponent = <Text >Empty =(</Text>;

    return (

      <View>
        {/*
          <ImageBrowser
            max={4}
            onChange={this.updateHandler}
            callback={this.imagesCallback}
            renderSelectedComponent={this.renderSelectedComponent}
            emptyStayComponent={emptyStayComponent}
          />
          */}

      </View>
    )
  }
}

export default ImageBrowserScreen;
