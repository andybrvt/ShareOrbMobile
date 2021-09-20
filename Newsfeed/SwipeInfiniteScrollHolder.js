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


  render(){
   let smallGroups = []

   if(this.props.smallGroups){
     smallGroups = this.props.smallGroups
   }

    return(

      <ScrollView>
        {/*
          <Header />
          */}

        <View style = {{flex: 1, height:height -10 }}>

          <ScrollableTabView
            style={{ marginTop: 10 }}
             initialPage={0}
             renderTabBar={() => <ScrollableTabBarNew />}
            >
            {smallGroups.map((group, indx) => {
              const pic = `${global.IMAGE_ENDPOINT}` + group.groupPic
              return(
                <InfiniteScrollFlatNew name='tab1' tabLabel={pic} />

              )


            })}

              <Text name = "tab3" tabLabel = "tab3"/>


          </ScrollableTabView>

        </View>


      </ScrollView>


    )
  }
}

const styles = StyleSheet.create({
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
