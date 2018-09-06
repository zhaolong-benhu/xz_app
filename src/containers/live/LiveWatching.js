/**
 * Created by qzy on 26/03/2017.
 * File description:直播观看
 */
import React, {Component} from "react";
import {Alert, Keyboard, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image} from "react-native";
import {
  addRedPocketToCaster,
  alterUserNum,
  barragePriceChanged,
  changeCasterIsOnLine,
  changeLiveFavorite,
  changePay,
  choosePay,
  clearLiveRomm,
  closeThemeModal,
  emitOneBarrage,
  emitOneMsgByWatcher,
  getAliPayParams,
  getBarrage,
  getBarragesOrder,
  getLiveBarrage,
  getLiveWatchRoom,
  getOrderSuccess,
  getTheme,
  pushRedPocket,
  pushUserIcon,
  quitGroup,
  randomPay,
  remove_barrage,
  set_barrage,
  toggleCheckoutModal,
  toggleChoosePay,
  togglePayModal
} from "../../actions";
import {
  BarrageLists,
  BarragesPopup,
  ButtonBottom,
  ButtonWatchingBottom,
  CastUserInfo,
  Chat,
  CheckoutPayment,
  KeyBoardMaskInput,
  PayModal,
  RedPocketMsg,
  renderIf,
  Settings,
  ThemeModal,
  ViewersBar
} from "../../components";
import {Actions} from "react-native-router-flux";
import LinearGradient from "react-native-linear-gradient";
import {connect} from "react-redux";
import * as base from "../../components/common/base";
import {onSendMsg} from "../../components/common/base";
import webim from "../../components/common/webim";
import {global_height, global_width, platform} from "../../util";
import LiveComponent from "../../components/common/IOSStreaming";
import RCTLive from "../../components/live/PlayerView";
import IOSPlayStreaming from "../../components/common/IOSPlayStreaming";
import {post,getFetchNeverCached} from "../../helpers/helpers";
import {Analytics, Hits as GAHits} from 'react-native-google-analytics';

class LiveWatching extends Component {
  state = {
    keyboardActived: false,
    text: '',
    menuPopup: false,
    toggleSetting: false,
    stop: false,
  }
  playStreaming = false

  componentWillMount() {
    //ga
    // let clientId = DeviceInfo.getUniqueID();
    ga = new Analytics('UA-42452173-1', '', 1, `${platform === 'ios'? "ios" : 'android'}`);
    var screenView = new GAHits.ScreenView(
        'XianZhi App',
        '直播页面',
        '',
        ''
    );
    ga.send(screenView);

    console.log('caster_status'+this.props.caster_status)
    this.props.getLiveWatchRoom(this.props.id, this.props.caster_status)
    //获取弹幕价格
    // this.props.getLiveBarrage(this.props.id)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillReceiveProps(nextProps) {
// 组件数据更新
//     console.log(`caster_status: ${this.props.caster_status}`)
    // console.log('same====='+JSON.stringify(nextProps.liveRoomInfo))
    if (this.props.caster_status != 1 && Object.keys(nextProps.liveRoomInfo).length != 0 && this.props.liveRoomInfo.live_user_id != nextProps.liveRoomInfo.live_user_id && nextProps.liveRoomInfo.user_id === nextProps.liveRoomInfo.live_user_id) {
      this.props.clearLiveRomm()
      Alert('主播无法进入自己的房间，请先直播')
      Actions.pop()
      return false
    }

    //聊天部分
    if (this.props.user.user_ticket !== nextProps.user.user_ticket ||
        (this.props.liveChatRoom.loginInfo && (this.props.liveChatRoom.loginInfo.identifierNick !== nextProps.liveChatRoom.loginInfo.identifierNick)) ||
        (this.props.liveChatRoom.avChatRoomId !== nextProps.liveChatRoom.avChatRoomId && nextProps.liveChatRoom.avChatRoomId !== null)) {
      //if (nextProps.roomProps.status == 1 || nextProps.roomProps.status == 4) {
          this.quitBigGroup()
          this.logout()
           console.log('进来了')
          this.webimLogin(nextProps)
       //}
      // this.props.getLiveBarrage(nextProps.id)
    }


    if (platform === "ios") {
      //IOS看推流
      if (this.props.caster_status !== 1 && this.props.liveRoomInfo.flv_downstream_address !== nextProps.liveRoomInfo.flv_downstream_address && nextProps.liveRoomInfo.flv_downstream_address) {
        this.playStreaming = true;
        // IOSPlayStreaming.addPlayUrl(nextProps.liveRoomInfo.flv_downstream_address);
        return false
      }
      //IOS主播推流
      if (this.props.liveRoomInfo.upstream_address !== nextProps.liveRoomInfo.upstream_address && this.props.caster_status === 1) {
        // console.log(nextProps.liveRoomInfo.upstream_address)
        LiveComponent.addUrl(nextProps.liveRoomInfo.upstream_address);
        return false
      }
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //ga关注事件
  gaAdd = () => {
    var gaEvent = new GAHits.Event('zb','zbtx', 'A-12',);
    ga.send(gaEvent);
  }
  //ga弹幕事件
  gaBarrage = () => {
    var gaEvent = new GAHits.Event( 'zb','dms', 'A-12',);
    ga.send(gaEvent);
  }

  //渲染推流和看推流
  renderStreaming(is_caster) {
      //IOS
      if (platform === 'ios') {
        // 看推流
        if (!is_caster && this.props.roomProps.status == 1) {
          // console.log(this.playUrl)
          // console.log(this.props.liveRoomInfo.flv_downstream_address)
          if (this.playStreaming === true) {
            console.log('看推流了')
            this.playStreaming = false
            IOSPlayStreaming.addPlayUrl(this.props.liveRoomInfo.flv_downstream_address);
          }
        }
      }
      //安卓看推流
      if (platform === 'android') {
        if (!is_caster && this.props.roomProps.status == 1) {
          return <RCTLive style={{width: global_width, height: global_height}}
                          stop={this.state.stop}
                          url={this.props.liveRoomInfo.flv_downstream_address}
          />
        } else {
          return <View style={{width: global_width, height: global_height}}/>
        }
      }
  }

  casterLogin = false
// 聊天登录
  webimLogin = (nextProps) => {
    //消息处理器
    const message_processor = {
      emitOneMsgByWatcher: this.props.emitOneMsgByWatcher,
      alterUserNum: async () => {
        let res = await getFetchNeverCached('mv1/live/live-online-num', {id: nextProps.liveRoomInfo.id})
        if(res){
          this.props.alterUserNum(res.num_show)
        }
      },
      emitOneBarrage: this.props.emitOneBarrage,
      pushUserIcon: this.props.pushUserIcon,
      emitOneRedPocketByWatcher: this.props.pushRedPocket,
      addRedPocketToCaster: this.props.addRedPocketToCaster,
      barragePriceChanged: this.props.barragePriceChanged,
      changeCasterIsOnLine: () => {
        try {
          if (nextProps.liveRoomInfo.live_user_id === nextProps.liveRoomInfo.user_id) {
            console.log('是主播')
            if (this.casterLogin === false) {
              this.casterLogin = true
            } else {
              this.stopPush();
              this.quitBigGroup();
              this.logout();
              this.props.clearLiveRomm()
            }
          }
        } catch (e) {
          console.log(e)
        }
      },
      stopPlay:() =>{
        this.setState({stop:true})
      }
    }
    const listeners = {
        // "onConnNotify": base.onConnNotify, //选填
        "onBigGroupMsgNotify": base.onBigGroupMsgNotify(message_processor, nextProps), //监听新消息(大群)事件，必填
        // "onMsgNotify": base.onMsgNotify,//监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
        // "onGroupSystemNotify": base.onGroupSystemNotify, //监听（多终端同步）群系统消息事件，必填
        // "onGroupInfoChangeNotify": function (data) {
        //   console.log(data)
        // }
    };
    const options = {
      'isAccessFormalEnv': true,//是否访问正式环境，默认访问正式，选填
      'isLogOn': true //是否开启控制台打印日志,默认开启，选填
    };

    //第一个参数用户信息，第二个事件，第三个
    webim.login(nextProps.liveChatRoom.loginInfo, listeners, options, () => {
      //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
      console.log(nextProps.liveChatRoom.loginInfo)
      webim.Log.info('webim登录成功');
      base.applyJoinBigGroup(nextProps.liveChatRoom.avChatRoomId,function(data){
        if(data){
          base.onSendMsg(
              "进入房间",
              0,
              nextProps.liveChatRoom.loginInfo,
              nextProps.liveChatRoom.avChatRoomId
          )
        }else{
          console.log('进群失败');
        }
      });//加入大群


      //发送用户头像
      onSendMsg(
          JSON.stringify({headurl: nextProps.liveChatRoom.loginInfo.headurl}),
          0,
          nextProps.liveChatRoom.loginInfo,
          nextProps.liveChatRoom.avChatRoomId
      )
      //直播开始了，防止主播重复
      if (nextProps.liveRoomInfo.live_user_id === nextProps.liveRoomInfo.user_id) {
        setTimeout(() => onSendMsg(
            JSON.stringify({type: "PushStart"}),
            0,
            nextProps.liveChatRoom.loginInfo,
            nextProps.liveChatRoom.avChatRoomId
        ), 2000)
      }
    }, (err) => {
      console.log(err.ErrorInfo);
    })

  }

  onChangeText = (text) => this.setState({text})
// 打开主题
  openModal = () => {
    // const is_caster = this.props.liveRoomInfo && this.props.user && this.props.liveRoomInfo.live_user_id == this.props.user.user_id;
    // if (!is_caster) {
    this.props.getTheme({id: this.props.id, status: this.props.roomProps.status})
    // }
  }
// 键盘隐藏显示
  _keyboardDidShow = () => {
    this.setState({keyboardActived: true,})

  }

  _keyboardDidHide = () => {
    this.setState({keyboardActived: false,})
  }

//退出大群
  quitBigGroup = () => {
    var options = {
      'GroupId': this.props.liveChatRoom.avChatRoomId//群id
    };
    webim.quitBigGroup(
        options,
        (resp) => {
          webim.Log.info('退群成功');
          // base.onSendMsg(
          //     "退群房间",
          //     2,
          //     this.props.liveChatRoom.loginInfo,
          //     this.props.liveChatRoom.avChatRoomId
          // )
          this.props.quitGroup();
        }
    );
  }
//主播退出
  casterQuitMsg = () => {
    const {loginInfo, avChatRoomId} = this.props.liveChatRoom
    onSendMsg("主播已经退出直播，本次直播已结束~", 0, loginInfo, avChatRoomId);
    onSendMsg(JSON.stringify({type: 'PushingStop'}), 3, loginInfo, avChatRoomId);
  }
//登出
  logout = () => {
    // console.log("登出")
    // //登出
    // webim.logout(
    //     function (resp) {
    //       webim.Log.info('登出成功');
    //       // loginInfo.identifier = null;
    //       // loginInfo.userSig = null;
    //     }
    // );
  }
//键盘获得焦点
  onFocus = () => {
    this.setState({keyboardActived: true})
  }
//文字弹出
  togglePayText = () => {
    this.gaBarrage()//ga弹幕
    this.setState({emitPayText: !this.state.emitPayText})
  }
//菜单弹出
  toggleMenuPopup = () => this.setState({
    menuPopup: !this.state.menuPopup,
    toggleSetting: false,
  })

  toggleSettingPopup = () => this.setState({toggleSetting: !this.state.toggleSetting})

  onSetting = () => {
    this.toggleMenuPopup();
    this.toggleSettingPopup();
    //获取弹幕价格
    this.props.getBarrage(this.props.id);
  }
//旋转摄像头
  rotateCamera = () => {
    if (platform === 'ios') {
      LiveComponent.rotateCamera();
    }
  }
//停止播放
  stopPlay = () => {
    if (platform === 'ios') {
      IOSPlayStreaming.stopPlay();
    }else{
      this.setState({stop:true})
    }
  }
// 停止推流
  stopPush = () => {
    if (platform === 'ios') {
      LiveComponent.stopPush();
    }
    post('mv1/user/live/close-live', {live_id: this.props.id})
  }
  //判断是否登录，没有跳到登录页
  ifNotAuthedToLogin = () => {
    console.log(this.props.user.user_ticket)
    // console.log(this.props )
    if (this.props.user.user_ticket === "") {
      // Alert('请先登录')
      this.alert()
      return false
    }
    return true;
  }

  alert = () => {
    platform=='ios' ?
    Alert.alert(
        '提示',
        '请先登录',
        [
          {text: '取消',},
          {
            text: '登录', onPress: () => {
            Actions.LoginScreen({liveId: this.props.id});
          }
          },
        ],
        {cancelable: false}
    )
    :
    Actions.LoginScreen({liveId: this.props.id});
  }

  render() {
    const is_caster = this.props.liveRoomInfo && this.props.user && this.props.liveRoomInfo.live_user_id == this.props.user.user_id;
    console.log('-----------'+this.state.keyboardActived)
    return (
        <View>
          <StatusBar
              backgroundColor='#303F9F'
              barStyle='light-content'
          />
          {/* <BarrageLists data={this.props.liveChatRoom.barrages} removeBarrage={this.props.remove_barrage}/>
          {
            renderIf(this.state.menuPopup,
                <Settings {...this.props} toggleMenuPopup={this.toggleMenuPopup} onSetting={this.onSetting}/>)
          } */}
          {
            renderIf(this.props.caster_status !== 1 && platform === "ios" && !this.state.stop, <IOSPlayStreaming/>)
          }
          {
            renderIf(is_caster && this.props.caster_status === 1 && platform === "ios", <LiveComponent/>)
          }

          {this.renderStreaming(is_caster)}

          <LinearGradient
              locations={[0, 0.3, 0.7, 1]}
              colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
              style={platform === "android" ? styles.linearGradient_android : styles.linearGradient}
          >
            {
              //是否结束直播
              renderIf((this.state.stop || this.props.liveRoomInfo.live_status == 3) && !is_caster,
                <Image source={require('../../static/images/live/liveStop.png')} style={{width: global_width, height: global_height}}/>
              )
            }
            {
              renderIf(this.props.liveRoomInfo.live_status == 4 && !is_caster,
                <Image source={require('../../static/images/live/liveEndBg.png')} style={{width: global_width, height: global_height}}/>
              )
            }
            <View style={styles.topWrapper}>
              <CastUserInfo
                  is_caster={is_caster}
                  {...this.props.liveRoomInfo}
                  type={"castor"}
                  onPress={() => {
                    if (this.props.user.user_ticket) {
                      this.gaAdd()//ga加关注
                      this.props.changeLiveFavorite(this.props.id)
                    } else {
                      this.alert()
                    }
                  }}
              />
              <ViewersBar {...this.props.liveRoomInfo} {...this.props.liveChatRoom}/>
            </View>

            {
              this.props.liveChatRoom.redPockets.length > 0 ?
                  <View style={styles.chatWrapper}>
                    <RedPocketMsg data={this.props.liveChatRoom.redPockets}/>
                  </View> : null
            }
            {
              platform == 'ios' ?
                  <View style={styles.bottomWrapper}>

                    <Chat data={this.props.liveChatRoom.message}/>

                    {
                      is_caster ?
                          null :
                          (<TouchableOpacity onPress={this.openModal} style={styles.themeBtn}>
                            <Text style={{fontSize: 15,}}>主题</Text>
                          </TouchableOpacity>)
                    }
                    {
                      is_caster && this.props.caster_status == 1 ?
                          //主播端底部按钮
                          <ButtonBottom
                              {...this.props}
                              text={this.state.text}
                              onChangeText={(text) => this.onChangeText(text)}
                              onQuitPress={() => {
                                this.casterQuitMsg();
                                this.stopPush();
                                this.quitBigGroup();
                                this.logout();
                                this.props.clearLiveRomm()
                              }}
                              emitPayText={this.state.emitPayText}
                              onFocus={this.onFocus}
                              closeInput={() => this.setState({keyboardActived: false})}
                              clearInput={() => this.setState({text: ''})}
                              toggleMenuPopup={this.toggleMenuPopup}
                              rotateCamera={this.rotateCamera}
                              stopPush={() => this.stopPush}
                          /> :
                          //用户端底部按钮
                          <ButtonWatchingBottom
                              {...this.props}
                              money={this.props.livePay.textPayNums}
                              togglePayText={this.togglePayText}
                              text={this.state.text}
                              onChangeText={(text) => this.onChangeText(text)}
                              onQuitPress={() => {
                                this.stopPlay();
                                this.quitBigGroup();
                                this.logout();
                                this.props.clearLiveRomm()
                              }}
                              emitPayText={this.state.emitPayText}
                              onFocus={this.onFocus}
                              closeInput={() => this.setState({keyboardActived: false})}
                              clearInput={() => this.setState({text: ''})}
                              ifNotAuthedToLogin={this.ifNotAuthedToLogin}
                          />
                    }
                  </View>
                  :
                  null
            }
          </LinearGradient>
          <ThemeModal
              themeModalShow={this.props.themeModalShow}
              timeOver={this.props.roomProps.status} //1,2,3
              data={this.props.theme}
              close={() => {
                this.props.closeThemeModal()
              }}
          />
          {
            renderIf(this.props.showPayModal,
                <PayModal {...this.props}/>)
          }
          <CheckoutPayment
              {...this.props}
              emitPayText={this.state.emitPayText}
              text={this.state.text}
              clearInput={() => this.setState({text: ''})}
          />
          {
            this.state.keyboardActived && platform === 'ios' ?
                <KeyBoardMaskInput
                    text={this.state.text}
                    emitPayText={this.state.emitPayText}
                    togglePayText={this.togglePayText}
                    money={this.props.livePay.textPayNums}
                    needBadge={!is_caster}
                    ifNotAuthedToLogin={this.ifNotAuthedToLogin}
                    alert={this.alert}
                /> : null
          }
          {
            renderIf(this.state.toggleSetting,
                <BarragesPopup {...this.props} toggleSettingPopup={this.toggleSettingPopup}/>)
          }

          {
            platform === 'ios' ? null
                :
                <View style={styles.bottomWrapper}>
                  <Chat data={this.props.liveChatRoom.message}/>
                  {
                    is_caster ?
                        null :
                        (<TouchableOpacity onPress={this.openModal} style={styles.themeBtn}>
                          <Text style={{fontSize: 15,}}>主题</Text>
                        </TouchableOpacity>)
                  }
                  {
                    is_caster && this.props.caster_status == 1 ?
                        //主播端底部按钮
                        <ButtonBottom
                            {...this.props}
                            text={this.state.text}
                            onChangeText={(text) => this.onChangeText(text)}
                            onQuitPress={() => {
                              this.casterQuitMsg();
                              this.stopPush();
                              this.quitBigGroup();
                              this.logout();
                            }}
                            emitPayText={this.state.emitPayText}
                            onFocus={this.onFocus}
                            closeInput={() => this.setState({keyboardActived: false})}
                            clearInput={() => this.setState({text: ''})}
                            toggleMenuPopup={this.toggleMenuPopup}
                            rotateCamera={this.rotateCamera}
                            stopPush={() => this.stopPush}
                        /> :
                        //用户端底部按钮
                        <ButtonWatchingBottom
                            {...this.props}
                            money={this.props.livePay.textPayNums}
                            togglePayText={this.togglePayText}
                            text={this.state.text}
                            onChangeText={(text) => this.onChangeText(text)}
                            onQuitPress={() => {
                              this.playStreaming = false;
                              this.stopPlay();
                              this.quitBigGroup();
                              this.logout();
                            }}
                            emitPayText={this.state.emitPayText}
                            onFocus={this.onFocus}
                            closeInput={() => this.setState({keyboardActived: false})}
                            clearInput={() => this.setState({text: ''})}
                            ifNotAuthedToLogin={this.ifNotAuthedToLogin}
                        />
                  }
                </View>
          }
        </View>
    );
  }
}

const mapStateToProps = ({liveWatchRoom, user, livePay, liveChatRoom}) => {
  return {
    liveRoomInfo: liveWatchRoom.liveRoomInfo,
    user: user.userInfo,
    theme: liveWatchRoom.theme,
    themeModalShow: liveWatchRoom.themeModalShow,
    roomProps: liveWatchRoom.roomProps,
    showPayModal: liveWatchRoom.showPayModal,
    showCheckoutModal: liveWatchRoom.showCheckoutModal,
    payNumber: liveWatchRoom.payNumber,
    payTo: liveWatchRoom.payTo,
    openChoosePay: liveWatchRoom.openChoosePay,
    barrages: liveWatchRoom.barrages,
    livePay: livePay,
    liveChatRoom: liveChatRoom
  }
}

export default connect(mapStateToProps, {
  togglePayModal,
  toggleCheckoutModal,
  toggleChoosePay,
  getLiveWatchRoom,
  changeLiveFavorite,
  getTheme,
  closeThemeModal,
  randomPay,
  changePay,
  choosePay,
  getOrderSuccess,
  getAliPayParams,
  quitGroup,
  emitOneMsgByWatcher,
  alterUserNum,
  getLiveBarrage,
  getBarragesOrder,
  emitOneBarrage,
  pushUserIcon,
  pushRedPocket,
  addRedPocketToCaster,
  getBarrage,
  set_barrage,
  remove_barrage,
  barragePriceChanged,
  clearLiveRomm,
  changeCasterIsOnLine
})(LiveWatching)

const styles = StyleSheet.create({
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 20,
    width: global_width,
    zIndex:10,
  },
  chatWrapper: {paddingHorizontal: 10, marginBottom: 10, position: 'absolute', bottom: 40, height: 220},
  bottomWrapper: {position: 'absolute', bottom: 0},
  themeBtn: {
    position: 'absolute',
    right: 10,
    bottom: 60,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 100,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradient: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: global_height,
    width: global_width
  },
  linearGradient_android: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: global_height - 24,
    width: global_width
  },
  textInputStyle: {
    height: 50,
    width: global_width,
  },
  popupMenuText: {
    fontSize: 18,
    color: '#fff',
  },
  menuOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
