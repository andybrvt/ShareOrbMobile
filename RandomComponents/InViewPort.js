import React from "react";
import { View, Dimensions } from 'react-native'


class InViewPort extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      rectTop: 0,
      rectBottom: 0
    }
  }

  componentDidMount() {
    // check if it is disabled so that you can run it
    if (!this.props.disabled) {
      this.startWatching()
    }
  }

  componentWillUnmount() {
     this.stopWatching()
   }

   componentDidUpdate(prevProps){

     if(this.props.disabled){
       this.stopWatching()

     }
     else {
       this.lastValue = null
       this.startWatching()
     }
   }

   startWatching(){
      if (this.interval) {

        // if interval is already made so you just return
        return
      }

      // if it has not been already made, you will now make it
      // here
      this.interval = setInterval(() => {
        if (!this.myview) {
          return
        }
        this.myview.measure((x, y, width, height, pageX, pageY) => {
          this.setState({
            rectTop: pageY,
            rectBottom: pageY + height,
            rectWidth: pageX + width
          })
        })
        this.isInViewPort()
      }, this.props.delay || 100)
   }

   stopWatching() {
   this.interval = clearInterval(this.interval)
 }

 isInViewPort() {
    const window = Dimensions.get('window')
    const isVisible =
      this.state.rectBottom != 0 &&
      this.state.rectTop >= 0 &&
      this.state.rectBottom <= window.height &&
      this.state.rectWidth > 0 &&
      this.state.rectWidth <= window.width
    if (this.lastValue !== isVisible) {
      this.lastValue = isVisible
      this.props.onChange(isVisible)
    }
  }



  render(){

    return(
      <View
        collapsable={false}
         ref={component => {
           this.myview = component
         }}
         {...this.props}
        >
        {this.props.children}
      </View>
    )
  }
}

export default InViewPort;
