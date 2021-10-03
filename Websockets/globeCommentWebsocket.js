// comments used specifically for globe

class WebsocketGlobeComment{


  static instance = null;
  callbacks = {};

  static getInstance(){
    if(!WebsocketGlobeComment.instance){
      WebsocketGlobeComment.instance = new WebsocketGlobeComment()
    }

    return WebsocketGlobeComment.instance
  }

  constructor(){
    this.socketRef = null
  }

  connect(globeItem){
    //This will be for connecting to each individual soical cal cell page
    //each one will be its own channel, this will optimize the liking and
    // commenting
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/globeComments/`+globeItem
    console.log(path)
    this.socketRef = new WebSocket(path)
    this.socketRef.onopen = () => {
      console.log('websocket open')
    }

    this.socketRef.onmessage = (e) => {
      this.socketNewGlobeComments(e.data)
    }
    this.socketRef.onerror = (e) => {
    }
    this.socketRef.onclose = () => {
      console.log('websocket is closed')
      // Similar to the event page you will not need to recall the connect agian


    }
  }

  addCallbacks(
    fetchGlobeItemComment,
    sendGlobeItemComment
  ){
    this.callbacks['fetch_globe_item_comment'] = fetchGlobeItemComment
    this.callbacks['send_globe_item_comment'] = sendGlobeItemComment
  }

  socketNewGlobeComments(data){
    const parsedData = JSON.parse(data);
    const command = parsedData.command;

    console.log(parsedData)
    if(command === "fetch_globe_item_comment"){
      const globeComments = parsedData.itemComments

      this.callbacks['fetch_globe_item_comment'](globeComments)
    }
    if(command === "send_globe_item_comment"){
      const globeComment = parsedData.itemComment

      // put call back here
      this.callbacks['send_globe_item_comment'](globeComment)

    }
  }


  fetchComments(itemId){

    this.sendCommentGlobeInfo({
      itemId: itemId,
      command: 'fetch_globe_item_comment'
    })
    // this.sendCommentCellInfo({
    //   cellId: cellId,
    //   command: "fetch_comment_cell_info"
    // })
  }

  sendGlobeComment(globeItem, userId, comment){
    this.sendCommentGlobeInfo({
      globeItem: globeItem,
      userId: userId,
      comment: comment,
      command: "send_globe_item_comment"
    })
  }

  disconnect(){
    console.log('disconnect')
    this.socketRef.close()
  }

  sendCommentGlobeInfo(data){
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

const GlobeCommentWebsocketInstance = WebsocketGlobeComment.getInstance();

export default GlobeCommentWebsocketInstance;
