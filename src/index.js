/**
 * Created by Same on 2017/2/23.
  File description:页面布局
 */
'use strict';
import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { App } from './containers';
import Home from './containers/live/Home';
import Live from './containers/Live/Live';
import Study from './containers/Study/Study';
import User from './containers/User/User';

import {
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
export default class xianzhiApp extends Component{
    state={
         tab_0_icon:"http://a3.qpic.cn/psb?/V139UqDu3P7fb4/1E6dFmT1rvFtxofbGrsxwZZqu6r3Ad9szweF4grPGEc!/m/dG4BAAAAAAAAnull&bo=LgAqAAAAAAADByY!&rf=photolist&t=5",
         tab_1_icon:"http://a4.qpic.cn/psb?/V139UqDu3P7fb4/aT1I9drTqgz0nV*SFg0LLXdgbaMDfPYJE2gMZ8oTXIk!/m/dAsBAAAAAAAAnull&bo=LAArAAAAAAADByU!&rf=photolist&t=5",
         tab_2_icon:"http://a4.qpic.cn/psb?/V139UqDu3P7fb4/furwBRLjFwYRcxfSB9*lS4u5WGsaOdHIcSn5kFZebhw!/m/dN8AAAAAAAAAnull&bo=LAAqAAAAAAADByQ!&rf=photolist&t=5",
         tab_3_icon:"http://a3.qpic.cn/psb?/V139UqDu3P7fb4/XqhnKk1LQ96LuQHK*CUPksABX8LbAj5JVKyKVDFALzc!/m/dG4BAAAAAAAAnull&bo=KAArAAAAAAADByE!&rf=photolist&t=5",

         tab_0_icon_active:"http://a3.qpic.cn/psb?/V139UqDu3P7fb4/BU6i8qITNORerZ4at7e9eu3hd7K23bLgop*xhCyy7X0!/m/dG4BAAAAAAAAnull&bo=LgAqAAAAAAADByY!&rf=photolist&t=5",
         tab_1_icon_active:"http://a4.qpic.cn/psb?/V139UqDu3P7fb4/aT1I9drTqgz0nV*SFg0LLXdgbaMDfPYJE2gMZ8oTXIk!/m/dAsBAAAAAAAAnull&bo=LAArAAAAAAADByU!&rf=photolist&t=5",
         tab_2_icon_active:"http://a4.qpic.cn/psb?/V139UqDu3P7fb4/furwBRLjFwYRcxfSB9*lS4u5WGsaOdHIcSn5kFZebhw!/m/dN8AAAAAAAAAnull&bo=LAAqAAAAAAADByQ!&rf=photolist&t=5",
         tab_3_icon_active:"http://a3.qpic.cn/psb?/V139UqDu3P7fb4/XqhnKk1LQ96LuQHK*CUPksABX8LbAj5JVKyKVDFALzc!/m/dG4BAAAAAAAAnull&bo=KAArAAAAAAADByE!&rf=photolist&t=5",
    }
    static defaultProps = {
        bHaveMsg:true,
    };
    constructor(props){
        super(props)
    }

  render(){
    return (
        <Router>
          <Scene key="root">
              <Scene key="mainPage" tabs={true} tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle} panHandlers={null}>
              <Scene key="home" initial title="首页" icon={TabIcon} iconName="home" hideNavBar={true} icons={this.state.tab_0_icon} icon_actives={this.state.tab_0_icon_active}>
                  <Scene
                      key="tab_1"
                      component={Home}
                      title='首页'
                      panHandlers={null}
                      />
              </Scene>
              <Scene key="live" title="直播" icon={TabIcon} iconName="live"  hideNavBar={true} navigationBarStyle={styles.navBarStyle} icons={this.state.tab_1_icon} icon_actives={this.state.tab_1_icon_active}>
                  <Scene
                      key="tab_2"
                      component={Live}
                      title='直播'
                      titleStyle={styles.titleStyle}
                      />
              </Scene>
              <Scene key="study" title="学习" icon={TabIcon} iconName="study" hideNavBar={true} navigationBarStyle={styles.navBarStyle}  icons={this.state.tab_2_icon} icon_actives={this.state.tab_2_icon_active}>
                  <Scene
                      key="tab_3"
                      component={Study}
                      title='学习'
                      titleStyle={styles.titleStyle}
                      />
              </Scene>
              <Scene key="me" title="我的" icon={TabIcon} iconName="user" hideNavBar={true} navigationBarStyle={styles.navBarStyle} icons={this.state.tab_3_icon} icon_actives={this.state.tab_3_icon_active}>
                  <Scene
                      key="tab_4"
                      component={User}
                      title="我的"
                      titleStyle={styles.titleStyle}
                      />
              </Scene>
              </Scene>
          </Scene>
        </Router>
    );
  }
}
const TabIcon = ({ selected, title, icon,icons, icon_actives }) => {
  return (
      <View>
          <View style={{width:25,height:25,justifyContent:'center',alignItems:'center'}}>
              <Image style={{width:22,height:22}} source={{uri: selected ? icon_actives : icons}}/>
          </View>
        <Text style={{color: selected ? '#167fda' :'#666666',fontSize:12}}>{title}</Text>
      </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    navBarStyle: {
        backgroundColor: '#ffff',
    },
    tabBarStyle: {
        backgroundColor: '#FFFF',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#FFFF',
    },
    titleStyle: {
        color: '#333',
        fontSize: 20,
    }
});
