/**
 * Created by zhaolong on 2017/03/21.
 * File description:首页-菜单分类
 */
'use strict'

import React, {Component} from "react";

import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {Analytics, Hits as GAHits} from 'react-native-google-analytics';
import {global_width, platform} from "../../util";
import {Actions} from "react-native-router-flux";
import {glo_url} from "../../api/global";


export default class Plates extends Component {
  state = {}
  static defaultProps = {
    all_plates: [
      {
        title: '在线课程',
        name: "在线课程",
        img: '',
        link: "/category/3",
        statistics: {Action: 'kecheng', Label: 'sy', Category: 'yketang'}
      },
      {title: '智库', name: "智库", img: '', link: "/papers", statistics: {Action: 'zk', Label: 'sy', Category: 'yketang'}},
      {
        title: '线下公开课',
        name: "线下公开课",
        img: '',
        link: "/gongkaike",
        statistics: {Action: 'gkaike', Label: 'sy', Category: 'yketang'}
      },
      {
        title: 'IHMA证书',
        name: "IHMA证书",
        img: '',
        link: "/ihma",
        statistics: {Action: 'ihma', Label: 'sy', Category: 'yketang'}
      },
      {
        title: '导师',
        name: "内训",
        img: '',
        link: "/neixun",
        statistics: {Action: 'neixun', Label: 'sy', Category: 'yketang'}
      },
      {
        title: 'LMS企业商学院',
        name: "企业商学院",
        img: '',
        link: "/lms",
        statistics: {Action: 'lms', Label: 'sy', Category: 'yketang'}
      },

    ],
    all_plates_img1: require('../../static/images/plates/zaixiankecheng.png'),
    all_plates_img2: require('../../static/images/plates/zhiyerenzheng.png'),
    all_plates_img3: require('../../static/images/plates/zhiku.png'),
    all_plates_img4: require('../../static/images/plates/xianxiahuodong.png'),
    all_plates_img5: require('../../static/images/plates/neixun.png'),
    all_plates_img6: require('../../static/images/plates/qiyeshangxueyuan.png'),
  };

  componentWillMount() {
    this.props.all_plates[0].img = this.props.all_plates_img1;
    this.props.all_plates[1].img = this.props.all_plates_img2;
    this.props.all_plates[2].img = this.props.all_plates_img3;
    this.props.all_plates[3].img = this.props.all_plates_img4;
    this.props.all_plates[4].img = this.props.all_plates_img5;
    this.props.all_plates[5].img = this.props.all_plates_img6;
    //ga
    // let clientId = DeviceInfo.getUniqueID();
    ga = new Analytics('UA-42452173-1', '', 1, `${platform === 'ios' ? "ios" : 'android'}`);
    var screenView = new GAHits.ScreenView(
        'XianZhi App',
        '主页',
        '',
        ''
    );
    ga.send(screenView);
  }

  goUrl = (value) => {
    var gaEvent = new GAHits.Event(value.statistics.Category, value.statistics.Action, value.statistics.Label);
    ga.send(gaEvent);
    Actions.XZWebView({title: value.title, url: glo_url + value.link})
  }

  render() {
    return (
        <View style={styles.container}>
          {this.props.all_plates.map((value, index) => {
            return <TouchableWithoutFeedback
                onPress={() => this.goUrl(value)}
                key={"all_plates" + index}>
              <View style={styles.nav} key={'all_plates' + index}>
                <View style={{marginLeft: 40}}>
                  <Image source={value.img} style={styles.img}/>
                </View>
                <Text style={styles.name}
                      onPress={() => this.goUrl(value)}>
                  {value.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          })}
        </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    marginTop: 5,
  },
  nav: {
    width: global_width / 3,
    height: 78,
    justifyContent: 'center',
  },
  img: {
    width: 40,
    height: 40,
  },
  name: {
    width: 120,
    textAlign: 'center',
    color: '#333333',
    marginTop: 5
  }
})
