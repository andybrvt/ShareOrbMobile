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
            <View style={{flex: 1,}}>
                <FlatList
                  style = {{flex:1}}
                  data = {this.state.list}
                  renderItem = {this.renderItem}
                  keyExtractor={(item, index) => String(index)}

                  />
            </View>
        )
    }
}

class SwipeInfiniteScrollHolder extends React.Component{


  render(){

    return(

      <ScrollView>

        <Header />
        <View style = {{flex: 1, height:height - 70 }}>

          <ScrollableTabView
            style={{ marginTop: 70 }}
             initialPage={0}
             renderTabBar={() => <ScrollableTabBarNew />}
            >
            <Page name='tab1' tabLabel='tab1' />
             <Page name='tab2' tabLabel='tab2' />
             <Page name='tab3' tabLabel='tab3' />
             <Page name='tab4' tabLabel='tab4' />
             <Page name='tab5' tabLabel='tab5' />
             <Page name='tab6' tabLabel='tab6' />
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
