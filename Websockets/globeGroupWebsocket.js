class WebSocketGlobe {
  // this websocket will be use to connect to the global
  // websocket where everyone and all the groups post pictures
  // eavery 6 hours with their highest liked post


  static instance = null;
  callbacks = {}

  static getInstance(){
    if(!WebSocketGlobe.instance){
      WebSocketGlobe.instance = new WebSocketGlobe();
    }
    return WebSocketGlobe.instance
  }

  constructor(){
    this.socketRef = null
  }

  connect(){
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/globeGroup`
    this.socketRef = new WebSocket(path)

    this.socketRef.onopen = () => {

    }
    this.socketRef.onmessage = (e) => {
      this.socketNewGlobePost(e.data)
    }

    this.socketRef.onerror = (e) => {

    }

    this.socketRef.onclose = () => {
      this.connect()
    }

  }

  disconnect(){
    this.socketRef.close();
  }


  socketNewGlobePost(data){
    const parsedData = JSON.parse(data);
    const command = parsedData.command;

    console.log(parsedData.command,'parsed the data here')
    if(command === 'fetch_globe_post'){
        const globePost = JSON.parse(parsedData.globe_post)
        this.callbacks['fetch_globe_post'](globePost)
    }

    if(command === "send_globe_post_like_unlike"){
      const globePost = parsedData.post


      //add call back here
      this.callbacks['send_globe_post_like'](globePost)
    }
    if(command === "update_single_globe_item"){
      const globePost = parsedData.globeItem

      // put call back here
      this.callbacks['send_globe_post_like'](globePost)
    }

  }

  addCallbacks(
    fetchGlobePost,
    sendGlobePostLike
  ){
    this.callbacks['fetch_globe_post'] = fetchGlobePost
    this.callbacks['send_globe_post_like'] = sendGlobePostLike
  }


  fetchGlobePost(){
    // this will be everybody post so it is not a problem
    this.sendPostsInfo({
      command: "fetch_globe_post"
    })
  }

  sendGroupLike(
    globeId,
    likerId
  ){
    this.sendPostsInfo({
      globeId: globeId,
      likerId: likerId,
      command: "send_group_like"
    })
  }

  sendGroupUnlike(
    globeId,
    unlikerId
  ){
    this.sendPostsInfo({
      globeId: globeId,
      unlikerId: unlikerId,
      command: "send_group_unlike"
    })
  }

  updateSingleGlobeItem(globeItem){

    this.sendPostsInfo({
      globeItem: globeItem,
      command: 'update_single_globe_item'
    })
  }


  sendPostsInfo(data){
    try {
      this.socketRef.send(JSON.stringify({...data}))
    } catch(err){

    }
  }

  state(){
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback){
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function(){
        if (socket.readyState === 1){
          if (callback != null) {
            callback();
          }
          return;
        } else{
            recursion(callback)
        }
      }, 1)
  }




}

const WebSocketGlobeInstance = WebSocketGlobe.getInstance();

export default WebSocketGlobeInstance;
