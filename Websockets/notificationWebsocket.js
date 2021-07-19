
class WebSocketNotifications {


  static instance = null;
  callbacks = {};

  static getInstance(){

      if(!WebSocketNotifications.instance){
        WebSocketNotifications.instance = new WebSocketNotifications();
      }
      return WebSocketNotifications.instance
  }

  constructor(){
    this.socketRef = null

  }

  connect(username){
    const path = `${global.WS_HEADER}://${global.WS_ENDPOINT}/ws/friend-request-notification/`+username
    console.log(path)
    this.socketRef = new WebSocket(path)
    this.socketRef.onopen = () =>{
      console.log('websocket open')
    }
  // I guess group_send also sends it to onmessage
  // All the json.send sends to here
    this.socketRef.onmessage = (e) => {
      this.socketNewNotification(e.data)
    }

    this.socketRef.onerror = (e)=> {
      console.log(e.message);
    }

    this.socketRef.onclose = () => {
      console.log('websocket is closed notification', username)

      // this.connect(username);
    }
  }

  disconnect(){
    console.log('disconnected notification')
    this.socketRef.close();
  }

  // Make sure to find out how to do the phone notification
  // you cna put it in here
  // CHECK showNotification on shareorb

  socketNewNotification(data){


    const parsedData = JSON.parse(data);
    const command = parsedData.command;

    console.log(parsedData)
    if (command === 'notifications') {
        const notifications = JSON.parse(parsedData.notifications);
        this.callbacks['notifications'](notifications)
        // if(parsedData.requestList){
        //   const requestList = JSON.parse(parsedData.requestList)
        //
        //   console.log(requestList)
        //   // Add call back here
        //
        //   this.callbacks['update_follow_request'](requestList)
        // }
        // if(parsedData.followersList){
        //   const followersList = JSON.parse(parsedData.followersList)
        //
        //   console.log(followersList)
        //
        //   // Add call back here
        //   this.callbacks['auth_update_followers'](followersList)
        // }


    } else if (command === 'new_notification') {
        const notification = JSON.parse(parsedData.notification)
        this.callbacks['new_notification'](notification)
        //
        // // Add a call back where you jsut add 1 to the notificationseen her
        //
        // this.callbacks['add_one_notification_seen']()
        // //
        // if(notification.type === "follow_request_notification"){
        //   // put the call back for updating the request in the auth here.
        //
        //
        //   const newRequest = JSON.parse(parsedData.requestObj)
        //
        //   console.log(newRequest)
        //   this.callbacks['new_follow_request'](newRequest)
        // }
        // if(notification.type === "follow_notification"){
        //
        //   console.log(parsedData.followerObj)
        //   const newFollower = JSON.parse(parsedData.followerObj)
        //
        //   console.log(newFollower)
        //   // START HERE AND TRYING GETTING AUTH TO UPDATE
        //
        //   // add call back here
        //   this.callbacks['auth_add_follower'](newFollower)
        // }
        // createNotification(JSON.parse(data['notification']));
    }

  }


  addCallbacks(
    notificationsCallback,
    newNotificationCallback,
    // addNewFollowRequest,
    // updateFollowRequest,
    // authAddFollower,
    // authUpdateFollowers,
    // addOneNotificationSeen,
  ){
    this.callbacks['notifications'] = notificationsCallback;
    this.callbacks['new_notification'] = newNotificationCallback;
    // this.callbacks['new_follow_request'] = addNewFollowRequest;
    // this.callbacks['update_follow_request'] = updateFollowRequest;
    // this.callbacks['auth_add_follower'] = authAddFollower;
    // this.callbacks['auth_update_followers'] = authUpdateFollowers;
    // this.callbacks['add_one_notification_seen'] = addOneNotificationSeen;
  }


  // this command will be changed later
  fetchFriendRequests(userId){
    this.sendNotification({
      userId: userId,
      command: 'fetch_friend_notifications'
    })
  }

  sendNotification(data) {
    // this is good, it only sends 1 time
    // This will recieve information from onClickSend from PersonalProfile.js
    // and will send it to the userprofile.consumers

    // GOOD TILL HERE

    console.log('send_notification')
    try{
      this.socketRef.send(JSON.stringify({...data }))
    } catch (err) {
      console.log(err.message);
    }
  }

  state() {
    return this.socketRef.readyState;
  }

  waitForSocketConnection(callback) {
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

const NotificationWebSocketInstance = WebSocketNotifications.getInstance();

export default NotificationWebSocketInstance;
