import React from 'react';
import {
 ScrollView,
 StyleSheet,
 Text,
 View,
 Image,
 TextInput,
 Button,
 TouchableOpacity,
 Keyboard,
 TouchableWithoutFeedback,
 KeyboardAvoidingView,
 Dimensions,
 AsyncStorage,
 Modal,
 Constants,
 FlatList,
} from "react-native";
import { Plus } from "react-native-feather";

const width = Dimensions.get("window").width
const height = Dimensions.get('window').height

class GoalDropDown extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      showCreateGoal: false,
      newGoal: ''
    }

  }

  componentDidMount(){
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
     () => {this._keyboardDidShow()});
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {this._keyboardDidHide()});
  }

  _keyboardDidShow = () => {
    this.setState({
      showKeyboard: true
    })
  }

  _keyboardDidHide = () => {
    this.setState({
      showKeyboard: false
    })
  }

  renderItem = ({item}) => {

    return (
      <TouchableOpacity
        onPress = {() => this.props.select(item)}
        >
        <View style = {{
            alignItems: 'center',
            justifyContent: 'center',
            height: 70,
          }}>

          <Text style = {{
              color: 'white'
            }}>{global.CAPITALIZE(item.goal)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderCreateGoal = () => {


    return(
      <View
        style = {{
          position: 'absolute',
          height: 100,
          width: 100,
          backgroundColor: 'white'
        }}
        >

      </View>
    )
  }

  showCreateGoal = () => {
    this.setState({
      showCreateGoal: true
    })
  }

  closeFunction = () => {
    if(this.state.showKeyboard === true){
      Keyboard.dismiss()
    } else {
      this.props.onClose()
    }
  }

  onChange = e => {

    this.setState({
      newGoal: e
    })
  }

  render(){

    let showGoals = this.props.showGoals;
    return(
      <TouchableWithoutFeedback
        onPress = {() => this.closeFunction()}
        >

        <View
          style = {{
            zIndex: 99,
            position: 'absolute',
            height: height,
            width: width,
            alignItems: 'center',
            justifyContent: 'center',
            display: showGoals ? "" : 'none'
          }}
          >

            <View
              style = {{
                width: '80%',
                height: '70%',
                backgroundColor: '#000000aa',
                borderRadius: 20,
                padding: 20
              }}
              >
              <View>
                <Text
                  style = {{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 20
                  }}
                  >Attach a goal to this post</Text>
              </View>

              {

                this.state.showCreateGoal ?

                <View
                  style = {{
                    flex: 1,
                    alignItems: 'center',

                  }}
                  >
                  <View
                    style = {{
                      backgroundColor: 'gray',
                      top: '20%',
                      width: '100%',
                      padding: 15,
                      borderRadius: 30
                    }}
                    >
                    <TextInput
                      style = {{
                        color: "white"
                      }}
                      placeholder = "Write a goal"
                      value = {this.state.newGoal}
                      onChangeText = {this.onChange}
                       />

                  </View>

                  <View
                    style = {{
                      flexDirection: 'row',
                      top: '35%'
                    }}
                    >

                    <Button
                      title = "cancel"
                      />

                    <Button
                      title = "save"
                      disabled = {this.state.newGoal.length === 0}
                      />
                  </View>


                </View>

                :

                <FlatList
                  data = {this.props.data}
                  renderItem = {this.renderItem}
                  keyExtractor={(item, index) => String(index)}

                   />



              }


              {
                this.state.showCreateGoal ?

                null

                :


                <View >
                  <TouchableOpacity
                    onPress = {() => this.showCreateGoal()}
                    >
                    <Plus

                      height = {40}
                      width = {40}
                      />

                  </TouchableOpacity>

                  <Button
                    onPress = {() => this.props.cancel()}
                    title = "none"
                     />
                </View>


              }




            </View>


        </View>

      </TouchableWithoutFeedback>

          )

  }

}

export default GoalDropDown;
