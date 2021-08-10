class WebSocketSocialNewsfeed{

  static instance = null;
  callbacks = {}

  static getInstance(){
    if(!WebSocketSocialNewsfeed.instance){
      WebSocketSocialNewsfeed.instance = new WebSocketSocialNewsfeed();
    }
    return WebSocketSocialNewsfeed.instance
  }

  constructor(){
  this.socketRef = null
  }

  connect(){
  const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/socialNewsfeed`
  this.socketRef = new WebSocket(path)

  this.socketRef.onopen = () => {
    console.log('websocket open')
  }
  this.socketRef.onmessage = (e) => {
    // console.log(e.data)
    this.socketNewSocialPost(e.data)
  }

  this.socketRef.onerror = (e) => {
    console.log(e);
  }

  this.socketRef.onclose = () => {
    console.log('WebSocket is closed')
    // this.connect()
  }
  }

  disconnect() {
    console.log('disconnected')
    this.socketRef.close();
  }

  socketNewSocialPost(data){
  // Pretty much will process the data when it is received from the backend


  const parsedData = JSON.parse(data);
  const command = parsedData.command;
  // Make the different calls here
  if(command === "fetch_social_posts"){
    const curSocialCalCellList = JSON.parse(parsedData.curSocialCalCell)
    let curSocialCell = {}
    if(curSocialCalCellList.length > 0){
      curSocialCell = curSocialCalCellList[0];
    }

    const socialPost = JSON.parse(parsedData.social_posts)

    this.callbacks['fetch_social_posts'](socialPost)

    this.callbacks['fetch_cur_social_cell'](curSocialCell)


  }
  else if(command === "send_single_post_like"){
    const socialCalCellObj = parsedData.socialCalItemObj
    this.callbacks['add_single_post_like'](socialCalCellObj)

  }
  else if(command === "send_single_post_unlike"){
    const socialCalCellObj = parsedData.socialCalItemObj
    this.callbacks['add_single_post_like'](socialCalCellObj)

  }
  else if(command === "update_single_post"){
    const socialCalCellObj = parsedData.socialCalItemObj
    this.callbacks['add_single_post_like'](socialCalCellObj)

  }

  // else if (command === "send_social_post_like"){
  //   const contentTypeId = parsedData.contentTypeId
  //   const socialCalCellObj = parsedData.socialCalCellObj
  //
  //   const content = {
  //     contentTypeId: contentTypeId,
  //     socialCalCellObj: socialCalCellObj
  //   }
  //
  //   this.callbacks['add_social_post_like'](content)
  //
  // }
  //  else if( command === "send_social_post_unlike"){
  //   const contentTypeId = parsedData.contentTypeId
  //   const socialCalCellObj = parsedData.socialCalCellObj
  //
  //   const content = {
  //     contentTypeId: contentTypeId,
  //     socialCalCellObj: socialCalCellObj
  //   }
  //
  //   // put the call back here
  //   this.callbacks['add_social_post_like'](content)
  // }
  else if (command === "update_new_cell_social_newsfeed"){

    const socialPostObj = parsedData.socialPostObj
    const curId = parsedData.curId
    const created = parsedData.created
    if(parseInt(this.callbacks['curId']) === socialPostObj.owner.id){
      this.callbacks['fetch_cur_social_cell'](socialPostObj.post)
    }

    if(created === true){
      this.callbacks['add_first_social_cell_post'](socialPostObj)
    } else if(created === false){
      this.callbacks['update_social_cell_post'](socialPostObj)

    }

  }
  // else if(command === "remove_all_photo_social_post"){
  //   // This will be use to update the soical cal cell of the curUser and update the
  //   // newsfeed when you remove all your pics
  //
  //   // so you would need one that updates just your social cal cell
  //   const curId = parsedData.curId
  //
  //   const curSocialCalCellList = parsedData.curSocialCalCell
  //
  //   let curSocialCell = {}
  //   if(curSocialCalCellList.length > 0){
  //     curSocialCell = curSocialCalCellList[0];
  //   }
  //
  //   if(parseInt(this.callbacks['curId']) === curId){
  //     this.callbacks['fetch_cur_social_cell'](curSocialCell)
  //
  //   }
  //
  //   const socialPost = parsedData.social_posts
  //   this.callbacks['fetch_social_posts'](socialPost)
  //
  //
  //
  //
  // }

}

  /*
  This function is used to remove all the pictures and the social cal
  cell from the newsfeed
  */
  removeAllPhotoSocialPost(curId, curDate){

    this.sendPostsInfo({
      curDate: curDate,
      userId: curId,
      command: "remove_all_photo_social_post"
    })
  }

  addCallbacks(
      curId,
      loadSocialPostCallback,
      addSingleLikeCallback,
      addSocialLikeCallback,
      loadCurSocialCellCallback,
      addFirstSocialCellPost,
      updateSocialCellPost
    ){
      this.callbacks['curId'] = curId
      this.callbacks['fetch_social_posts'] = loadSocialPostCallback
      this.callbacks['add_single_post_like'] = addSingleLikeCallback
      this.callbacks['add_social_post_like'] = addSocialLikeCallback
      this.callbacks['fetch_cur_social_cell'] = loadCurSocialCellCallback
      this.callbacks['add_first_social_cell_post'] = addFirstSocialCellPost
      this.callbacks['update_social_cell_post'] = updateSocialCellPost
    }

  fetchSocialPost(userId, curDate, startIndex){
  // Because of the timezone issue we need to get timezone from front end

    console.log('fetch social post')
    this.sendPostsInfo({
      userId: userId,
      curDate: curDate,
      startIndex: startIndex,
      command: "fetch_social_posts"
    })

  }

  addUpdateSocialPost(curId, cellId, created){
  // The curId will be used later to check if the social cal cell belongs to that
  // of the current user, if it is then you would update it

  // The cellid will be used to grab the actual cell

  // Craeted will check if it is new or not so that for the redux
  // you can either add to the top of the list of update an existing one

  // This will run when you have already made a cell and everything is updated
  // make an axios call and then send it through the here
  this.sendPostsInfo({
    curId: curId,
    socialCalCellId: cellId,
    created: created,
    command: "grab_new_updated_social_cell"
  })

  }


  sendOneLike(socialCalCellId, personLike, contentTypeId){
    // This is to send a like


    this.sendPostsInfo({
      socialCalCellId: socialCalCellId,
      personLike: personLike,
      contentTypeId: contentTypeId,
      command: "send_social_post_like"
    })
  }


  unSendOneUnlike(socialCalCellId, personUnlike, contentTypeId){
  // This is to unsend a like

    this.sendPostsInfo({
      socialCalCellId: socialCalCellId,
      personUnlike: personUnlike,
      contentTypeId: contentTypeId,
      command:"send_social_post_unlike"
    })
  }

  sendSinglePostLike(socialItemId, personLike){

    this.sendPostsInfo({
      socialItemId: socialItemId,
      personLike: personLike,
      command: "send_single_post_like"
    })
  }

  sendSinglePostUnlike(socialItemId, personUnlike){

    this.sendPostsInfo({
      socialItemId: socialItemId,
      personUnlike: personUnlike,
      command: "send_single_post_unlike"
    })
  }

  updateSinglePost(socialItemId){
    // This function is used mostly to update the post after comments

    console.log('update here')
    this.sendPostsInfo({
      socialItemId: socialItemId,
      command: 'update_single_post'
    })
  }

  sendPostsInfo(data){
  // This is to send it to the backend
    try {
      this.socketRef.send(JSON.stringify({...data}))
    } catch(err){
      console.log(err.message);
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
          console.log('connection is secure');
          if (callback != null) {
            callback();
          }
          return;
        } else{
            console.log('waiting for connection...')
            recursion(callback)
        }
      }, 1)
  }



}

const WebSocketSocialNewsfeedInstance = WebSocketSocialNewsfeed.getInstance();

export default WebSocketSocialNewsfeedInstance;
