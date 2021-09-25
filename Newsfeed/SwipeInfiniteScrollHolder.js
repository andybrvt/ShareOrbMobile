import React, {useRef} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
 } from 'react-native';
import { Avatar } from 'react-native-elements';
import ScrollableTabBarNew from './ScrollableTabBarNew';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Header from './Header';
import InfiniteScrollFlatNew from './InfiniteScrollFlatNew';
import { PlusCircle, UserPlus, Info, Users} from "react-native-feather";
import { connect } from 'react-redux';
import * as socialNewsfeedActions from '../store/actions/socialNewsfeed';


const height = Dimensions.get('window').height


class Page extends React.Component {
  state = {
    list: [1,2,3]
  }

  renderItem = ({item}) => {

    return(
      <View>
        <Text>Hi</Text>
      </View>
    )

  }
    render() {
        return (
                <InfiniteScrollFlatNew />
        )
    }
}

class SwipeInfiniteScrollHolder extends React.Component{

  navGroupInfo=()=> {

    this.props.navigation.navigate("GroupInfo",

    );
  }

  componentDidUpdate(prevProps){
  }

  render(){
   let smallGroups = []

   if(this.props.smallGroups){
     smallGroups = this.props.smallGroups
   }
   console.log(this.props.smallGroups["2"])

    return(
      <View>
        <View style={{zIndex: 999, position:'absolute', right:'10%', bottom:'5%',}}>
        <TouchableOpacity
          onPress={() => this.navGroupInfo()}
          style={styles.roundButton1}>

          <Users stroke="white" strokeWidth={2.5} width={22.5} height={22.5} />
        </TouchableOpacity>
        </View>
      <ScrollView
        scrollEnabled = {false}
        showsVerticalScrollIndicator={false}
        >
        {/*
          <Header />
          */}

        <View style = {{flex: 1, height:height -10 }}>

          <ScrollableTabView
            style={{ marginTop:10 }}
             initialPage={0}
             renderTabBar={() => <ScrollableTabBarNew
               navigation = {this.props.navigation}
               />}
            >
            {smallGroups.map((group, indx) => {
              const pic = `${global.IMAGE_ENDPOINT}` + group.groupPic
              return(
                <InfiniteScrollFlatNew
                  key = {indx}
                  groupId= {group.id}
                  name='tab1' tabLabel={{pic: pic, name:group.group_name}} />

              )


            })}

              <Text name = "tab3" tabLabel = "add"/>


          </ScrollableTabView>

        </View>




      </ScrollView>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  roundButton1: {

    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:99,
    borderRadius: 100,
    left:10,
    bottom:10,
    backgroundColor: '#1890ff',
    elevation:15,
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
});




export default SwipeInfiniteScrollHolder;
