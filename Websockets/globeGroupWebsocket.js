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

    console.log(parsedData)
    if(command === 'fetch_globe_post'){
        const globePost = JSON.parse(parsedData.globe_post)
        console.log(globePost)
    }

  }

  addCallbacks(){

  }


  fetchGlobePost(){
    // this will be everybody post so it is not a problem
    this.sendPostsInfo({
      command: "fetch_globe_post"
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
