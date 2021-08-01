import * as dateFns from 'date-fns';


// For IP adress
// global.IP_CHANGE = "http://10.3.0.116:19000"
// global.IMAGE_ENDPOINT = "http://10.3.0.116:19000"
// global.WS_ENDPOINT = "10.3.0.116:19000"
// global.POSTLIST_SPEC = 'http://10.3.0.116:19000/media/'
// global.WS_HEADER = "ws"

// Ping ethernet house
global.IP_CHANGE="http://192.168.1.205:19002"
global.IMAGE_ENDPOINT = "http://192.168.1.205:19002"
global.WS_ENDPOINT = "192.168.1.205:19002"
global.WS_HEADER = "ws"
global.POSTLIST_SPEC = 'http://192.168.1.205:19002/media/'
console.disableYellowBox = true;
// Ping house
// global.IP_CHANGE="http://172.17.0.1:19000"
// global.IMAGE_ENDPOINT = "http://172.17.0.1:19000"
// global.WS_ENDPOINT = "172.17.0.1:19000"
// global.WS_HEADER = "ws"
// global.POSTLIST_SPEC = 'http://172.17.0.1:19000/media/'

// andy house
// global.IP_CHANGE = "http://192.168.1.24:19000"
// global.IMAGE_ENDPOINT = "http://192.168.1.24:19000"
// global.WS_ENDPOINT = "192.168.1.24:19000"
// global.POSTLIST_SPEC = 'http://192.168.1.24:19000/media/'
// global.WS_HEADER = "ws"


// Andy hot spoot

// global.IP_CHANGE = "http://172.20.10.2:19000"
// global.IMAGE_ENDPOINT = "http://172.20.10.2:19000"
// global.WS_ENDPOINT = "172.20.10.2:19000"
// global.POSTLIST_SPEC = 'http://172.20.10.2:19000/media/'
// global.WS_HEADER = "ws"

// global.IP_CHANGE = "https://api.shareorb.com"
// global.IMAGE_ENDPOINT = ""
// global.WS_ENDPOINT = "api.shareorb.com"
// global.POSTLIST_SPEC = 'https://shareorb.s3.amazonaws.com/'
// global.WS_HEADER = "wss"


// global.IP_CHANGE = "http://10.20.100.62:19000"
// global.IMAGE_ENDPOINT = "http://10.20.100.62:19000"
// global.WS_ENDPOINT = "10.20.100.62:19000"
// global.POSTLIST_SPEC = 'http://10.20.100.62:19000/media/'
// global.WS_HEADER = "ws"

// global.IP_CHANGE = "http://172.20.10.2:19000"
// global.IMAGE_ENDPOINT = "http://172.20.10.2:19000"
// global.WS_ENDPOINT = "172.20.10.2:19000"
// global.POSTLIST_SPEC = 'http://172.20.10.2:19000/media/'
// global.WS_HEADER = "ws"


// global.IP_CHANGE = "http://10.20.100.62:19000"
// global.IMAGE_ENDPOINT = "http://10.20.100.62:19000"
// global.WS_ENDPOINT = "10.20.100.62:19000"
// global.POSTLIST_SPEC = 'http://10.20.100.62:19000/media/'
// global.WS_HEADER = "ws"


// console.disableYellowBox = true;
// This is for ua guest
// global.IP_CHANGE = "http://10.143.167.43:19000"
// global.IMAGE_ENDPOINT = "http://10.143.167.43:19000"
// global.WS_ENDPOINT = "10.143.167.43:19000"
// global.POSTLIST_SPEC = 'http://10.143.167.43:19000/media/'

// This is library wifi
// global.IP_CHANGE = "http://172.16.101.129:19000"
// global.IMAGE_ENDPOINT = "http://172.16.101.129:19000"
// global.WS_ENDPOINT = "172.16.101.129:19000"
// global.POSTLIST_SPEC = 'http://172.16.101.129:19000/media/'

global.CAPITALIZE = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

global.NAMEMAKE = (firstName, lastName, length) => {

  first = global.CAPITALIZE(firstName)
  last = global.CAPITALIZE(lastName)

  let name = first + " "+ last

  if(name.length > length){
    name = name.substring(0, length)
  }

  return name
}
// else if (timeDiff < 31*24*60 && timeDiff > 24*60) {
global.RENDER_TIMESTAMP = (timestamp) => {

    let prefix = '';
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
    if (timeDiff < 1 ) {
      prefix = `Just now`;
    } else if (timeDiff < 60 && timeDiff >= 1 ) {
      prefix = `${timeDiff}m`;
    }else if (timeDiff < 24*60 && timeDiff > 60) {
      prefix = `${Math.round(timeDiff/60)}h`;
    }
    // this condition fills if time difference is greater than 1 day, less than 7 days
    else if (timeDiff <7*24*60 && timeDiff >= 24*60) {
      prefix = `${Math.round(timeDiff/(60*24))}d`;
    } else {
        prefix = `${dateFns.format(new Date(timestamp), "MMMM dd")}`;
    }

    return prefix;
}


global.OVER_WEEK = (timestamp) => {

    let prefix = '';
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)

    prefix = `${dateFns.format(new Date(timestamp), "MMMM dd")}`;

    return prefix;
}

global.UNDER_WEEK = (timestamp) => {

  let prefix = '';
  const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
  if (timeDiff < 1 ) {
    prefix = `Just now`;
  } else if (timeDiff < 60 && timeDiff >= 1 ) {
    prefix = `${timeDiff}m`;
  }else if (timeDiff < 24*60 && timeDiff > 60) {
    prefix = `${Math.round(timeDiff/60)}h`;
  }
  // this condition fills if time difference is greater than 1 day, less than 7 days
  else if (timeDiff <7*24*60 && timeDiff > 24*60) {
    prefix = `${Math.round(timeDiff/(60*24))}d`;
  }
  else {
    prefix=""
  }

  return prefix;
}

global.RENDER_MONTH_DAY = (timestamp) => {

    let prefix = '';
    const timeDiff = Math.round((new Date().getTime() - new Date(timestamp).getTime())/60000)
    // this condition fills if time difference is greater than 2 days

    prefix = `${dateFns.format(new Date(timestamp), "MMMM")}`;


    return prefix;
}

// this is used to organize the file properly
global.FILE_NAME_GETTER = (fileURI) => {

  const fileName = fileURI.split("/").pop()

  let match = /\.(\w+)$/.exec(fileName);
  let type = match ? `image/${match[1]}` : `image`;


  return {
    uri: fileURI,
    type: type,
    name: fileName,
  }

}


// global.IP_CHANGE = "http://192.168.1.24:8000"
// global.IP_CHANGE = "http://192.168.1.200:19003"
