/**
 * Created by qzy on 26/03/2017.
 * File description:观众底部按钮
 */

import React, {Component} from "react";
import {Image, Share, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Dimensions from "Dimensions";
import {Actions} from "react-native-router-flux";
import {global_width, platform} from "../../util";
import {onSendMsg} from "../../components/common/base";
import {glo_url} from "../../api/global";
import {Badge} from "react-native-elements";
import {post} from "../../helpers/helpers";
import { Alert } from '../../components'
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    left: 0, right: 0,bottom:0,
    width: Dimensions.get('window').width,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {height: 49, color: 'white', fontSize: 15, width: 150, paddingTop: 0, paddingBottom: 0},
  btn: {width: (global_width - 170) / 3, height: 50, justifyContent: 'center', alignItems: 'center'}
})

class ButtonWatchingBottom extends Component {
  back = async () => {
    //退房间后更新在线人数
    await post('mv1/live/quit-online-num', {user_name: this.props.liveRoomInfo.user_name,channel_id:this.props.liveRoomInfo.channel_id,id:this.props.liveRoomInfo.id})
    this.props.onQuitPress()
    setTimeout(()=>{
      Actions.pop();
    },0)
  }
  _share = () => {
    Share.share({
      message: `我是${this.props.liveRoomInfo.live_user_name},${this.props.liveRoomInfo.live_status == 2?"将在":"正在"}直播《${this.props.liveRoomInfo.course_name}》,快来看看吧。 http://m.9first.com/liveshare/${this.props.id}`,
      url: `http://m.9first.com/liveshare/${this.props.id}`,
      title: '快来先之云课堂看直播！'
    }, {
      dialogTitle: '直播分享',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
  }
  _onSendMsg = () => {
    //弹幕不能立即清空输入内容,付款发送后清空
    const {loginInfo, avChatRoomId} = this.props.liveChatRoom
    const text = this.props.text
    if(loginInfo.userSig === null) {
      return
    }
    if(text.length <1 ) {
      Alert("发送的消息不能为空!");
      return;
    }
    if (this.props.emitPayText) {
      if (this.props.livePay.textPayNums > 0) {
        this.props.getBarragesOrder(this.props.id)
        this.props.toggleCheckoutModal('barrage')
        // 测试弹幕
        // onSendMsg(text, 1, loginInfo, avChatRoomId);
      } else {
        onSendMsg(JSON.stringify({"barrageTxt":text}), 1, loginInfo, avChatRoomId);
        this.props.clearInput()
      }

    } else {
      onSendMsg(this.props.text, 0, loginInfo, avChatRoomId);
      this.props.clearInput()
    }

  }

  render() {
    return (
        <View style={styles.wrapper}>
          {
            platform === 'android' ? <Badge
                containerStyle={{
                  backgroundColor: this.props.emitPayText ? '#f06292' : 'rgba(0,0,0,0)',
                  marginHorizontal: 14,
                  borderWidth: 0.5,
                  borderColor:'#666'
                }}
                value={'弹'}
                onPress={ () => {
                  this.props.ifNotAuthedToLogin() ? this.props.togglePayText() : null
                } }
                textStyle={{color: 'white'}}
            />: null
          }

          <TextInput
              autoCapitalize="none"
              placeholderTextColor={"#999"}
              placeholder={  platform === 'android' ? this.props.emitPayText? "发送弹幕(" + this.props.money + "元)" : "说点什么":"说点什么"}
              style={styles.input}
              onChangeText={this.props.onChangeText}
              textAlign='left'
              maxLength={34}
              value={this.props.text}
              onFocus={ () => this.props.onFocus()}
              onSubmitEditing={this._onSendMsg}
              blurOnSubmit={false}
              onEndEditing={() => this.props.closeInput()}
              returnKeyType={'send'}
              returnKeyLabel={'send'}
              autoCorrect={false}
              underlineColorAndroid={'transparent'}
          />

          <TouchableOpacity style={styles.btn} onPress={() => {
            if (this.props.ifNotAuthedToLogin()) {
              this.props.togglePayModal() && this.props.randomPay()
            }
          }}>
            <Image source={require('../../static/images/live/moneyBtn.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._share} style={styles.btn}>
            <Image source={require('../../static/images/live/shareBtn.png')}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.back} style={styles.btn}>
            <MaterialCommunityIcons name="close" size={30} color="#fff"/>
          </TouchableOpacity>

        </View>
    );
  }
}

export default ButtonWatchingBottom
