import React from 'react';
import {
  Text,
  View,
  Button,
  Animated
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
    console.log('in the loading bar')
    console.log(this.props)



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
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderRadius: this.props.height,
          overflow: "hidden"
        }}>
        <Animated.View

          style = {{
            height: this.props.height,
            width: "100%",
            borderRadius: this.props.height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
