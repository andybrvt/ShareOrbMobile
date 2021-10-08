
class WebSocketSinglePost{

  static instance = null;
  callbacks = {};


  static getInstance(){
    //This will check if the instance for the websocket exist if it doesnt then
    // it will make one

    if(!WebSocketSinglePost.instance){
      WebSocketSinglePost.instance = new WebSocketSinglePost()
    }

    return WebSocketSinglePost.instance
  }

  constructor(){
    this.socketRef = null
  }

  connect(postId){
    //This will be for connecting to each individual soical cal cell page
    //each one will be its own channel, this will optimize the liking and
    // commenting
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/singlePost/`+postId
    this.socketRef = new WebSocket(path)
    this.socketRef.onopen = () => {

    }

    this.socketRef.onmessage = (e) => {


    }
    this.socketRef.onerror = (e) => {
    }
    this.socketRef.onclose = () => {
      // Similar to the event page you will not need to recall the connect agian


    }
  }

  disconnect() {
    //This function will be used to disconnect with the channel when you open up
    // each calendar cal cell
    this.socketRef.close()
  }

  socketNewSinglePost(data){

  }

  addCallbacks(){

  }

  sendSinglePostInfo(data){
    //Send stuff in to the back end
    try{
      this.socketRef.send(JSON.stringify({...data}))
    } catch (err){

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
          if(callback != null){
            callback()
          }
          return;
        } else {
          recursion(callback)
        }
      }, 1)
  }




}

const SinglePostWebsocketInstance = WebSocketSinglePost.getInstance()

export default SinglePostWebsocketInstance;
