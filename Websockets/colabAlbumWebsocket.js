// Websocket gonna be used specifically for colab albums
// when you first login, probally gonna have a view that pulls
// you albums but when you press into the album you will
// access the websockets, which will be differentiated by the
// album id

class WebsocketColabAlbum{

  static instance = null;
  callbacks = {};

  static getInstance(){
    if(!WebsocketColabAlbum.instance){
      WebsocketColabAlbum.instance = new WebsocketColabAlbum()
    }

    return WebsocketColabAlbum.instance
  }

  constructor(){
    this.socketRef = null
  }

  // used the album id to
  connect(albumId){
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/colabAlbum/`+albumId
    console.log(path)
    this.socketRef = new WebSocket(path)
    this.socketRef.onopen = () => {
      console.log('websocket open')
    }

    this.socketRef.onmessage = (e) => {
      this.socketNewSocialAlbum(e.data)

    }
    this.socketRef.onerror = (e) => {
      console.log('websocket is closed ')
    }
    this.socketRef.onclose = () => {
      console.log('websocket is closed')
      // Similar to the event page you will not need to recall the connect agian


    }

  }

  disconnect(){
    this.socketRef.close();
  }

  // this is to add the call backs related to the colab in
  addCallbacks(

  ){

  }

  // this function is used to recieve the incoming data and
  // and sort it using redux callbacks
  socketNewSocialAlbum(data){

  }

  // used to fetch the album and its info
  fetchAlbums(albumId){

  }

  sendColabAlbumInfo(data){
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

const ColabAlbumWebsocketInstance = WebsocketColabAlbum.getInstance();

export default ColabAlbumWebsocketInstance;
