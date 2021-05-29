import React from 'react';
import {
  Text,
  View,
  Button,
  Animated,
  StyleSheet
 } from 'react-native';

class LoadingBar extends React.Component{

  constructor(props){
    super(props)

    // this.animatedValue = React.createRef();
    this.animatedValue = new Animated.Value(-1000);
    // this.reactive = React.createRef(new Animated.Value(-1000)).current;
    this.reactive = new Animated.Value(-1000);

    this.state  = {
      width: 0,
    }



  }

  componentDidMount(){
    Animated.timing(this.animatedValue, {
      toValue: this.reactive,
      duration: 300,
      useNativeDriver: true
    }).start()

  }

  componentDidUpdate(prevProps){

    // -width + width * step/steps
    // this.reactive.setValue()
    const width = this.state.width
    const step = this.props.step
    const steps = this.props.steps
    this.reactive.setValue(-width + width * step/steps)
  }



  render(){




    return (
      <View
        onLayout = { e => {
          const newWidth = e.nativeEvent.layout.width;

          this.setState({
            width: newWidth
          })
        }}
         style = {{
          height: this.props.height,
          // backgroundColor: "rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          // position: "absolute"
        }}>
        <Animated.View

          style = {{
            height: this.props.height,
            width: "100%",
            backgroundColor: '#1890ff',
            transform: [{
              translateX: this.animatedValue
            }]
          }}
           />
      </View>

    )


  }

}


export default LoadingBar;
