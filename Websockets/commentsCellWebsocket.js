// websocket is gonna use specific for comments that are open
// since for our site, the comment section is gonna be on its
// own


class WebsocketCellComments{

  static instance = null;
  callbacks = {};

  static getInstance(){
    if(!WebsocketCellComments.instance){
      WebsocketCellComments.instance = new WebsocketCellComments()
    }

    return WebsocketCellComments.instance
  }

  constructor(){
    this.socketRef = null
  }

  // probally just gonna be the id of the cell
  connect(cellId){
    //This will be for connecting to each individual soical cal cell page
    //each one will be its own channel, this will optimize the liking and
    // commenting
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/socialComments/`+cellId
    console.log(path)
    this.socketRef = new WebSocket(path)
    this.socketRef.onopen = () => {
      console.log('websocket open')
    }

    this.socketRef.onmessage = (e) => {

      this.socketNewSocialComments(e.data)
    }
    this.socketRef.onerror = (e) => {
      console.log('websocket is closed ')
    }
    this.socketRef.onclose = () => {
      console.log('websocket is closed')
      // Similar to the event page you will not need to recall the connect agian


    }
  }

  addCallbacks(
    fetchSocialComments,
    sendSocialComment
  ){
    this.callbacks['fetch_social_comments'] = fetchSocialComments
    this.callbacks['send_social_comment'] = sendSocialComment
  }

  socketNewSocialComments(data){

    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if(command === 'fetch_social_cell_comments'){
      // Now start setting put up the callbacks
      const socialComments = parsedData.socialComments
      this.callbacks['fetch_social_comments'](socialComments)
    }
    if(command === "send_comment_cell"){
      const comment = parsedData.comment

      this.callbacks['send_social_comment'](comment)
    }


  }

  fetchComments(cellId){

    this.sendCommentCellInfo({
      cellId: cellId,
      command: "fetch_comment_cell_info"
    })
  }

  sendComment(cellId, userId, comment){
    // sends the comment to the backend


    this.sendCommentCellInfo({
      cellId: cellId,
      userId: userId,
      comment: comment,
      command: "send_comment_cell"
    })
  }

  disconnect(){
    console.log('disconnect')
    this.socketRef.close()
  }

  sendCommentCellInfo(data){
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

const SocialCommentsWebsocketInstance = WebsocketCellComments.getInstance();

export default SocialCommentsWebsocketInstance;
