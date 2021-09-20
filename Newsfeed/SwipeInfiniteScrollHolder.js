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

class Page extends React.Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'blue'}}>
                <Text>{this.props.name}</Text>
            </View>
        )
    }
}

class SwipeInfiniteScrollHolder extends React.Component{


  render(){

    return(

      <ScrollView>
        <View style = {{flex: 1, height: 200}}>
          <ScrollableTabView
            style={{ marginTop: 20 }}
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
