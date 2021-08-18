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
 FlatList
} from "react-native";
import { Plus } from "react-native-feather";

const width = Dimensions.get("window").width
const height = Dimensions.get('window').height

class GoalDropDown extends React.Component{

  renderItem = ({item}) => {

    return (
      <TouchableOpacity>
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

  render(){

    let showGoals = this.props.showGoals;
    return(
      <TouchableWithoutFeedback
        onPress = {() => this.props.onClose()}
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

              <FlatList
                data = {this.props.data}
                renderItem = {this.renderItem}
                keyExtractor={(item, index) => String(index)}

                 />

               <Plus

                 height = {30}
                 width = {30}
                 />
            </View>


        </View>

      </TouchableWithoutFeedback>

          )

  }

}

export default GoalDropDown;
