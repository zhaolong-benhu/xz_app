/**
 * Created by zhaolong on 2017/07/04.
 * File description:个人中心-个人设置-修改密码
 */

'use strict'
import React, {
  Component
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {Scene, Router, Actions} from 'react-native-router-flux';
import {global_width, global_height} from '../../util/screen';
import {platform} from '../../util/platform';
import {glo_url} from '../../api/global';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ChangePassword extends Component {
    state={
        text:[
            {"title":"重置登录密码","url":"/user/UpdatePassWord"},
            {"title":"重置提现密码","url":"/user/SettingPwd/ResetExtractPwd"}
        ]
    }
    ResetPwd(title,url){
        if("重置登录密码" == title){
            Actions.UpdatePassWord();
        }else {
            Actions.XZWebView({title:title, url: glo_url + url});
        }
    }

  render() {
    return (
        <View style={styles.containter}>
            {this.state.text.map((value,index)=>{
                return <TouchableOpacity onPress={() => this.ResetPwd(value.title,value.url)}>
                     <View style={styles.item}>
                         <Text style={styles.msg}>{value.title}</Text>
                         {(() => {
                           if (platform == "android") {
                             return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                                          name="ios-arrow-forward-outline"/>
                           } else {
                             return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 10, fontSize: 15}}
                                          name="ios-arrow-forward-outline"/>
                           }
                         })()}
                     </View>
                 </TouchableOpacity>
            })}
        </View>
    )
  }
}

var styles = StyleSheet.create({
  containter: {
    backgroundColor: '#EEEEEE',
    width: global_width,
    height: global_height,
    marginTop: 54,
  },
  item:{
      width:global_width,
      height:50,
      justifyContent: 'center',
      borderColor:'#EEEEEE',
      borderTopWidth:10,
      backgroundColor:'#FFFFFF',
      paddingLeft:10,
  },
  msg: {
    fontSize: 16,
    color: '#333333',
    paddingBottom: 14,
    paddingTop: 14,
  },
})
