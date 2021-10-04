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

      this.socketNewGroupPost(e.data)
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

    console.log(parsedData)
    if(command === "fetch_group_post"){
        const groupPosts = parsedData.group_posts
        const groupId = parsedData.groupId
        const groupObj = {
          groupPosts,
          groupId
        }

        console.log('websockets here')
        this.callbacks['load_small_groups_post'](groupObj)
    }
    if(command === "send_group_post"){
      // You will set in the group post here into a specific
      // value in the dict
      const groupId = parsedData.groupId
      const groupPost = parsedData.post
      const groupObj = {
        groupId,
        groupPost
      }

      // add call back here
      this.callbacks['send_group_post'](groupObj)

    }
    if(command === "send_group_post_like_unlike"){
      const groupId = parsedData.groupId
      const groupPost = parsedData.post
      const groupObj  = {
        groupId,
        groupPost
      }

      // add call back here
      this.callbacks['send_group_post_like'](groupObj)

    }
    if(command === 'update_single_group_post'){
      const groupPost = parsedData.post
      const groupId = parsedData.groupId

      const groupObj = {
        groupId,
        groupPost
      }

      this.callbacks['send_group_post_like'](groupObj)

    }

  }

  // First function is to pull the intial information
  addCallbacks(
    loadSmallGroupsPost,
    sendGroupPost,
    sendGroupPostLike
  ){
    this.callbacks['load_small_groups_post'] = loadSmallGroupsPost
    this.callbacks['send_group_post'] = sendGroupPost
    this.callbacks['send_group_post_like'] = sendGroupPostLike
  }

  fetchGroupPost(groupId){
    // this function is to pull the intial information of the groupo
    this.sendGroupsInfo({
      groupId: groupId,
      command: "fetch_group_post"
    })
  }

  sendPostToGroup(groupId, postId){
    // this function will sned a specific group
    // a post someone just made+
    // You just need the post id to grab the post and the
    //  groupId to know which group you are trying to post to
    this.sendGroupsInfo({
      postId: postId,
      groupId: groupId,
      command: 'send_group_post'
    })

  }

  onGroupPostLike(
    postId,
    likerId,
    groupId
  ){
    this.sendGroupsInfo({
      postId: postId,
      likerId: likerId,
      groupId: groupId,
      command: 'send_group_post_like'
    })

  }

  onGroupPostUnlike(
    postId,
    unlikerId,
    groupId
  ){
    this.sendGroupsInfo({
      postId,
      unlikerId: unlikerId,
      groupId: groupId,
      command: 'send_group_post_unlike'
    })
  }

  updateSingleGroupPost(
    postId,
  ){
    this.sendGroupsInfo({
      postId,
      command: "update_single_group_post"
    })
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
