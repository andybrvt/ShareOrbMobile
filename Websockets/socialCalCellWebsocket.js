
//TEAR DOWN

class WebSocketSocialCalCellPage{
  static instance = null;
  callbacks = {};

  static getInstance(){
    //This will check if the instance for the websocket exist if it doesnt then
    // it will make one

    if(!WebSocketSocialCalCellPage.instance){
      WebSocketSocialCalCellPage.instance = new WebSocketSocialCalCellPage()
    }

    return WebSocketSocialCalCellPage.instance
  }

  constructor(){
    this.socketRef = null
  }

  connect(cellId){
    //This will be for connecting to each individual soical cal cell page
    //each one will be its own channel, this will optimize the liking and
    // commenting
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/newSocialCalendarCellPage/`+cellId
    console.log(path)
    this.socketRef = new WebSocket(path)
    this.socketRef.onopen = () => {
      console.log('websocket open')
    }

    this.socketRef.onmessage = (e) => {


      this.socketNewSocialCalCell(e.data)
    }
    this.socketRef.onerror = (e) => {
      console.log('websocket is closed ')
    }
    this.socketRef.onclose = () => {
      console.log('websocket is closed')
      // Similar to the event page you will not need to recall the connect agian


    }
  }

  disconnect() {
    //This function will be used to disconnect with the channel when you open up
    // each calendar cal cell
    console.log('disconnect')
    this.socketRef.close()
  }



  socketNewSocialCalCell(data){
    //This is to process all the command in the backend and tell them where to
    // go

    const parsedData = JSON.parse(data);
    const command = parsedData.command

    console.log('websockets ')
    console.log(parsedData)
    if(command === 'fetch_social_cal_cell_info'){
      // This will load up the information for the social cal cell page
      const socialCalCellObj = parsedData.socialCell
      // Add the call back in here
      this.callbacks['fetch_social_cal_cell_info'](socialCalCellObj)

    }

    // if(command === 'send_social_cal_cell_like_unlike'){
    //   //This will send a like and unlike to the redux so it can show it in the front end
    //
    //   //Pretty much what you are ognna do it just repalce the whole like list
    //   // with new one
    //   const likeList = parsedData.likeList
    //
    //   // YOU WILL BE USING THIS FOR BOTH THE LIKING AND UNLIKING
    //   this.callbacks['send_social_cal_cell_like_unlike'](likeList)
    // }
    //
    // if(command === "send_social_cal_cell_comment"){
    //   // This will send the comments
    //
    //   // You will just add the comment in at the end
    //
    //   const socialComment = parsedData.socialComment
    //
    //   this.callbacks['send_social_cal_cell_comment'](socialComment)
    // }
    //
    // if(command === "send_social_cal_cell_comment_like_unlike"){
    //   const commentObj=parsedData.socialCalComment
    //   this.callbacks['send_social_cal_cell_comment_like_unlike'](commentObj)
    // }
    //
    // if(command === "add_user_social_event_M"){
    //   const socialEventList = parsedData.socialEventList
    //
    //   // ADD CALL BACKS HERE
    //   this.callbacks['add_social_event_join_leave_M'](socialEventList)
    // }
    // if(command === "remove_user_social_event_M"){
    //   const socialEventList = parsedData.socialEventList
    //
    //   this.callbacks['add_social_event_join_leave_M'](socialEventList)
    //
    // }
    // if(command === "delete_social_cell_item"){
    //   const socialItemList = parsedData.socialItemList
    //
    //   // Add the call back here
    //   this.callbacks['delete_social_cell_item'](socialItemList)
    // }
    // if(command === "send_social_day_caption"){
    //   const dayCaption = parsedData.dayCaption
    //
    //   // This is teh calback
    //   this.callbacks['add_social_day_caption'](dayCaption)
    //
    // }
    // if(command === "deleted_social_cal_cell"){
    //   // This function will be similar to redux fetch function when there
    //   // is no cell in that day
    //   const socialCalCellObj = parsedData.socialCalCell
    //
    //   // Add the call back in here
    //   this.callbacks['fetch_social_cal_cell_info'](socialCalCellObj)
    // }

  }

  fetchSocialCalCellInfo(cellId){
    this.sendSocialCalCellInfo({
      cellId,
      command: 'fetch_social_cal_cell_info'
    })
  }



  addCallbacks(
    fetchSocialCalCellInfo,
    // sendSocialCalCellLikeUnlike,
    // sendSocialCalCellComment,
    // addSocialEventJoinLeave,
    // deleteSocialItem,
    // addSocialDayCaption,
    // sendSocialCalCellCommentLikeUnlike,
  ){
    this.callbacks['fetch_social_cal_cell_info'] = fetchSocialCalCellInfo
    // this.callbacks['send_social_cal_cell_like_unlike'] = sendSocialCalCellLikeUnlike
    // this.callbacks['send_social_cal_cell_comment'] = sendSocialCalCellComment
    // this.callbacks['add_social_event_join_leave_M'] = addSocialEventJoinLeave
    // this.callbacks['delete_social_cell_item'] = deleteSocialItem
    // this.callbacks['add_social_day_caption'] = addSocialDayCaption
    // this.callbacks['send_social_cal_cell_comment_like_unlike'] = sendSocialCalCellCommentLikeUnlike
  }



  sendSocialCalCellInfo(data){
    //Send stuff in to the back end
    try{
      this.socketRef.send(JSON.stringify({...data}))
    } catch (err){
      console.log(err.message)
    }
  }


  state(){
    return this.socketRef.readyState
  }

  waitForSocketConnection(callback){
    // This is a reucrsion that keeps trying to reconnect to the channel whenever
    // it gets disconnected
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function(){
        if(socket.readyState === 1){
          console.log('connection is secure');
          if(callback != null){
            callback()
          }
          return;
        } else {
          console.log('waiting for connection...')
          recursion(callback)
        }
      }, 1)
  }


}

const SocialCalCellPageWebSocketInstance = WebSocketSocialCalCellPage.getInstance();

export default SocialCalCellPageWebSocketInstance;
