// This websocket will be used for stuff related with the
// profile pages

class WebSocketExplore{


  static instance = null;
  callbacks = {}

  static getInstance(){
    if(!WebSocketExplore.instance){
      WebSocketExplore.instance = new WebSocketExplore()

    }

    return WebSocketExplore.instance


  }

  constructor() {
    this.socketRef = null
  }

  connect(username){
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/explore/` + username
    // I place the connection path in the app.js
    console.log(path)
    this.socketRef = new WebSocket(path)
    this.socketRef.onopen = () => {
      console.log('websocket open')
    }

    this.socketRef.onmessage = (e) => {
      console.log('new message')
      this.socketNewExplore(e.data)
    }

    this.socketRef.onerror = (e) => {
      console.log(e.message);
    }

    this.socketRef.onclose = () => {
      console.log('websocket is closed')
      // this.connect(username)
    }
  }

  disconnect() {
    console.log('disconnected')
    this.socketRef.close()
  }

  socketNewExplore(data){

    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    console.log(parsedData)
    console.log(command === 'user_profile_page')

    if (command === "user_profile"){
      //STATUS REDONE

      const profile = JSON.parse(parsedData.profile)
      this.callbacks['load_profile'](profile)

    } else if (command === 'send_follower'){
      // STATUS REDONE

      // MAKE SURE TO ADD A METHOD TO UPDATE THE AUTH TOO

      // This is to add to the other person's followers
      const newFollowerList = parsedData.followerList
      this.callbacks['new_follower_unfollower'](newFollowerList)

    } else if (command === 'send_unfollower'){
      // STATUS REDONE

      // MAKE SURE TO ADD A METHOD TO UPDATE THE AUTH TOO

      // This is to un add the other person follower
      const newFollowerList = parsedData.followerList
      this.callbacks['new_follower_unfollower'](newFollowerList)


    } else if(command === 'send_social_event'){
      // STATUS REDONE

      // Two senarios, one is when a cell is created and one where there
      // already exist a cell and you just change the event field to the new
      // one

      //There is a add social cell method in the redux already so we can
      // reuse that and then we will have one where it just repalces
      // the whole event field

      const socialCalCellObj = parsedData.socialCalCellObj
      const socialCalCellEvents = parsedData.socialCalCellObj.get_socialCalEvent
      const cellId = parsedData.socialCalCellObj.id
      if(parsedData.created){
        // For new cell with new event
        console.log(socialCalCellObj)
        this.callbacks['add_social_cell'](socialCalCellObj)
      } else {
        // For old cell with new event
        this.callbacks['add_social_event_join_leave'](socialCalCellEvents, cellId)
      }
    } else if (command == 'add_user_social_event'){
      // STATUS REDONE

      console.log(parsedData)
      const socialEventList = parsedData.socialEventList
      const socialCellId = parsedData.socialCellId

      this.callbacks['add_social_event_join_leave'](socialEventList, socialCellId)

    } else if (command === "remove_user_social_event"){
      // STATUS REDONE

      const socialEventList = parsedData.socialEventList
      const socialCellId = parsedData.socialCellId

      this.callbacks['add_social_event_join_leave'](socialEventList, socialCellId)

    } else if( command === "add_user_social_event_page"){
      // For the event tabs on the profile page
      const socialEventList = parsedData.socialEventList

      // add callbacks here
      this.callbacks['add_social_event_join_leave_page'](socialEventList)
    } else if(command === "remove_user_social_event_page"){
      // for the event tabs on the profile pages
      // simlar to the else if above but make this so peple know what
      // functions there are

      const socialEventList = parsedData.socialEventList

      this.callbacks['add_social_event_join_leave_page'](socialEventList)

    } else if(command === "edited_profile"){
      // This will go in and update the profile information by just replacing
      // the whole profile with the new updated profile

      const updatedProfile = parsedData.editedProfile

      // Add the callbacks here
      this.callbacks['load_profile'](updatedProfile)
      this.callbacks['edit_profile_auth'](updatedProfile)
    }
    else if(command === 'approve_social_pics'){
      // This function will add in pending pictures to the social calendar in the
      // appropriate cell
      const socialCalCellObj = parsedData.socialCelCellObj

      if(parsedData.created){
        // if by approving the pending picture you created another social cell then
        // you would just add it in like ususal

        console.log('created pending pics')
        this.callbacks['add_social_cell'](socialCalCellObj)

      } else {
        // This is for when the social cal cell is alrady created so you just have
        // to add in more social cell items


        // create call back here to search for the social cell and then add the pics
        // in
        // YOU HONELSTY JUST NEED TO ADD COVER PIC HERE
        this.callbacks['add_cover_pic'](socialCalCellObj.coverPic, socialCalCellObj.id)

      }
    } else if(command === "send_requested"){
      const requestedList = parsedData.requestedList

      // Now put the call back here
      this.callbacks['send_requested'](requestedList)


    } else if(command === "unsend_requested"){
      const requestedList = parsedData.requestedList

      this.callbacks['send_requested'](requestedList)
    } else if(command === 'send_following'){
      // This function will pretty much update the following of the current page
      // because

      const newFollowingList = parsedData.followingList


      // add call back here
      this.callbacks['send_following'](newFollowingList)

    }

  }


  addCallbacks(
     loadProfile,
     // addFollowerUnfollowerCallBack,
     // addSocialEventJoinLeave,
     // addSocialCell,
     // addSocialEventJoinLeavePage,
     // editProfileAuth,
     // addCoverPic,
     // addRequestCallBack,
     // addFollowing
   ){
    this.callbacks['load_profile'] = loadProfile
    // this.callbacks['new_follower_unfollower'] = addFollowerUnfollowerCallBack
    // this.callbacks['add_social_event_join_leave'] = addSocialEventJoinLeave
    // this.callbacks['add_social_cell'] = addSocialCell
    // this.callbacks['add_social_event_join_leave_page'] = addSocialEventJoinLeavePage
    // this.callbacks['edit_profile_auth'] = editProfileAuth
    // this.callbacks['add_cover_pic'] = addCoverPic
    // this.callbacks['send_requested'] = addRequestCallBack
    // this.callbacks['send_following'] = addFollowing
  }

  fetchProfile(username){
      // This will fetch the specific profile for the specific perosonal profile
      // page
      // The parameter username will be the username of the user (probally gonna
      // have to change it to id or a combination of id and username so we can pull
      // pull it easier and stuff like that)
      console.log('this is for fetching the profile')
      console.log(username)
      this.sendExplore({
        command: 'fetch_profile',
        username: username
      })
    }

  sendExplore(data){
    // So this is just used as a way to send info into the backend
    console.log(data)
    console.log('send_folower_following')
    try{
      this.socketRef.send(JSON.stringify({...data }))
    } catch (err) {
      console.log(err.message)
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback){
    const socket = this.socketRef;
    const recursion = this.waitForSocketConnection;
    setTimeout(
      function(){
        if(socket.readyState === 1){
          console.log('connection is secure')
          if(callback != null){
            callback();
          }
          return;
        } else {
          console.log('waiting for conneciton...')
          recursion(callback)
        }
      }, 1)
  }


}

const ExploreWebSocketInstance = WebSocketExplore.getInstance();


export default ExploreWebSocketInstance;
