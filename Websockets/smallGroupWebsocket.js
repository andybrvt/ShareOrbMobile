class WebSocketSmallGroups{

  // this websocket will be uesd to connect to multiple
  // websockets, each for a specific group

  static instance = null;
  callbacks = {}

  static getInstance(){
    if(!WebSocketSmallGroups.instance){
      WebSocketSmallGroups.instance = new WebSocketSmallGroups();
    }
    return WebSocketSmallGroups.instance
  }

  constructor(){
    this.socketRef = null
  }

  connect(groupId){
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/smallGroup/`+groupId
    this.socketRef = new WebSocket(path)

    this.socketRef.onopen = () => {
    }
    this.socketRef.onmessage = (e) => {

      // this.socketNewSocialPost(e.data)
    }

    this.socketRef.onerror = (e) => {

    }

    this.socketRef.onclose = () => {
      this.connect()
    }
  }

  disconnect() {
    this.socketRef.close();
  }

  socketNewGroupPost(data){


    const parsedData = JSON.parse(data);
    const command = parsedData.command;

    // You will have a websocket for each group and everytime
    // something gets sent through you have to check which weboscket
    // its coming from and put it in the correct group

  }

  // First function is to pull the intial information
  addCallbacks(){

  }

  fetchGroupPost(groupId){
    // this function is to pull the intial information of the groupo
  }

  sendGroupsInfo(data){
  // This is to send it to the backend
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

const WebSocketSmallGroupInstance = WebSocketSmallGroups.getInstance();

export default WebSocketSmallGroupInstance;
