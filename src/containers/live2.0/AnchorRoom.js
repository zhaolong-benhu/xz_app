/**
 * Created by zhaolong on 2017/10/18.
 * File description:直播主页面
 */

'use strict'

import React,{Component} from 'react'
import {
    Alert,
    BackAndroid,
    StyleSheet,
    View,
    Text,
    Image,
    ViewPagerAndroid,
    TouchableWithoutFeedback,
    TouchableOpacity,
    NativeModules,
    PanResponder,
    ListView,
    ToastAndroid,
    ScrollView,
    Animated,
    Easing,
}from "react-native";
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
  ViewersBar,
  LiveTitle,
  AnchorInformation,
  Interaction,
  Courseware,
  LiveDetail,
  HistoricalReview,
  Tips,
  Comment,
  VideoIntroduce,
  CastHeader,
  FullScreenCourseware,
  LiveIntroduce,
  Loading,
} from "../../components";

import {connect} from "react-redux";
import * as base from "../../components/common/base";
import {onSendMsg} from "../../components/common/base";
import webim from "../../components/common/webim";
import RCTLive from "../../components/live/PlayerView";
import LiveComponent from "../../components/common/IOSStreaming";
import IOSPlayStreaming from "../../components/common/IOSPlayStreaming";
import ViewPager from "react-native-viewpager";
import Orientation from 'react-native-orientation';
import LinearGradient from "react-native-linear-gradient";
import {Actions} from 'react-native-router-flux';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";
import {global_height, global_width, platform} from "../../util";
import {post,getFetchNeverCached} from "../../helpers/helpers";
import {Analytics, Hits as GAHits} from 'react-native-google-analytics';

const LiveNativeModule = NativeModules.LiveNativeModule;

class AnchorRoom extends Component {
    constructor(props) {
        super(props);
        let pages = [{
          title:"聊天室",
          key:0
        },{
          title:"课件",
          key:1
        },{
          title:"主播详情",
          key:2
        },{
          title:"历史回看",
          key:3
        }];

        var dataSource = new ViewPager.DataSource({
          pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.casterLogin = false;
        this.playStreaming = false;
        this.timer=null;
        this.tipsText='';
        this.orientation='';
        this.state = {
            page:0,
            pages:pages,
            bAddfollow:false,
            followText:"关注",
            w:global_width,
            h:global_height,
            isFull:false,
            zoom:false,
            emitPayText:false,
            text: '',
            stop: false,
            showViewPager: false,
            num:0,
            // autoTool: true,
            dataSource: dataSource.cloneWithPages(pages),
            paybg:require('../../static/images/live/payBg.png'),
        };
    }
    componentWillMount(){
      //判断是否主播页面
      if(this.props.caster_status==1)
      {
        this.onFullScreen()
        this.props.getLiveWatchRoom(this.props.id, this.props.caster_status)
      }
      ga = new Analytics('UA-42452173-1', '', 1, `${platform === 'ios'? "ios" : 'android'}`);
      var screenView = new GAHits.ScreenView(
          'XianZhi App',
          '直播页面',
          '',
          ''
      );
      ga.send(screenView);
      //获取弹幕价格
      // this.props.getLiveBarrage(this.props.id)
    }
    componentDidMount(){
        if (platform === 'android') {
          BackAndroid.addEventListener('hardwareBackPress', this.onBack);
        }
        else{
          Orientation.addOrientationListener(this._orientationDidChange);
        }
    }
    _orientationDidChange = (orientation) => {
      this.orientation=orientation
    }
    componentWillReceiveProps(nextProps) {
      // 组件数据更新
      if (this.props.caster_status != 1 && Object.keys(nextProps.liveRoomInfo).length != 0 && this.props.liveRoomInfo.live_user_id != nextProps.liveRoomInfo.live_user_id && nextProps.liveRoomInfo.user_id === nextProps.liveRoomInfo.live_user_id) {
        this.props.clearLiveRomm()
        Alert('主播无法进入自己的房间，请先直播')
        Actions.pop()
        return false
      }
      // console.log(this.props.user.user_ticket !== nextProps.user.user_ticket);
      // console.log(this.props.liveChatRoom.loginInfo.identifierNick !== nextProps.liveChatRoom.loginInfo.identifierNick);
      // console.log(this.props.liveChatRoom.avChatRoomId !== nextProps.liveChatRoom.avChatRoomId);
      // console.log(nextProps.liveChatRoom.avChatRoomId !== null);
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
        // this.props.getLiveBarrage(nextProps.id)//获取弹幕价格
      }


      if (platform === "ios") {
          //IOS看推流
        if (this.props.caster_status !== 1 && this.props.liveRoomInfo.flv_downstream_address !== nextProps.liveRoomInfo.flv_downstream_address && nextProps.liveRoomInfo.flv_downstream_address) {
          // console.log(1111)
          this.playStreaming = true;
          // IOSPlayStreaming.addPlayUrl(nextProps.liveRoomInfo.flv_downstream_address);
          return false
        }
        //IOS主播推流
        if (this.props.liveRoomInfo.upstream_address !== nextProps.liveRoomInfo.upstream_address && this.props.caster_status === 1) {
          // console.log(nextProps.liveRoomInfo.upstream_address)
          LiveComponent.addUrl(nextProps.liveRoomInfo.upstream_address,nextProps.liveRoomInfo.is_fair==1 ? true : false);
          // LiveComponent.addUrl('rtmp://2000.livepush.myqcloud.com/live/2000_44c6e64e79af11e69776e435c87f075e?bizid=2000',nextProps.liveRoomInfo.is_fair==1 ? true : false);
          return false
        }
      }

    }
    componentWillUnmount(){
      // clearInterval(this.timer)
      if (platform === 'android') {
        BackAndroid.removeEventListener('hardwareBackPress', null);
      }else{
        Orientation.removeOrientationListener(this._orientationDidChange);
      }
    }
    //渲染推流和看推流
    renderStreaming(is_caster) {
        //IOS
        if (platform === 'ios') {
          // 看推流
          if (!is_caster && this.props.roomProps.status == 1) {
            if (this.playStreaming === true) {
              console.log('看推流了')
              this.playStreaming = false
              IOSPlayStreaming.addPlayUrl(this.props.liveRoomInfo.flv_downstream_address);
              // IOSPlayStreaming.addPlayUrl('http://2000.liveplay.myqcloud.com/live/2000_44c6e64e79af11e69776e435c87f075e.flv');
            }
          }
          else {
              if(!is_caster){
                switch (this.props.liveRoomInfo.live_status) {
                  case 2:
                    this.tipsText = "主播即将空降～～快来关注吧～～";//直播未开始
                    break;
                  case 3:
                    this.tipsText = "当前主播不在家～～去看看回放吧！"//直播结束
                    break;
                  case 4:
                    this.tipsText = "主播正在快马加鞭赶来中～～"//到了直播时间未开播/中断直播
                    break;
                  default:
                    break;
                }
              }
              return <View style={{width: this.state.w, height: this.state.w*9/16,justifyContent:'center',alignItems: 'center'}}>
                  <Text style={{color:'#fff',fontSize:12,backgroundColor: 'transparent',}}>{this.tipsText}</Text>
                  {this.props.liveRoomInfo.live_status == "2" ?
                      <Text style={{color:'#fff',fontSize:10,marginTop:5,backgroundColor: 'transparent'}}>开播时间：{this.props.liveRoomInfo.start_time}</Text>
                      :null
                  }
              </View>
          }
        }
        //安卓看推流
        if (platform === 'android') {
          if (!is_caster && this.props.roomProps.status == 1 && !this.state.stop) {
            return <RCTLive
                      style={this.state.zoom ?
                      [styles.videoZoom,{width:this.state.w/3,height:this.state.h/3,bottom:0,right:0,zIndex:12}]
                      : this.state.isFull ? {width:this.state.w, height:this.state.h}: {width:this.state.w, height:this.state.w*9/16}}
                          url={this.props.liveRoomInfo.flv_downstream_address}
                          // url={'http://2000.liveplay.myqcloud.com/live/2000_44c6e64e79af11e69776e435c87f075e.flv'}
                          // url={"http://video-xz.veimg.cn/210/7900/pc_hd/210_7900zD77pFGI.mp4"}
            />
          } else {
              if(!is_caster){
                switch (this.props.liveRoomInfo.live_status) {
                  case 2:
                    this.tipsText = "主播即将空降～～快来关注吧～～";//直播未开始
                    break;
                  case 3:
                    this.tipsText = "当前主播不在家～～去看看回放吧！";
                    break;
                  case 4:
                    this.tipsText = "主播正在快马加鞭赶来中～～";
                    break;
                  default:
                    break;
                }
              }
              return <View style={{width: this.state.w, height: this.state.w*9/16,justifyContent:'center',alignItems: 'center'}}>
                  <Text style={{color:'#fff',fontSize:12,backgroundColor: 'transparent'}}>{this.tipsText}</Text>
                  {this.props.liveRoomInfo.live_status == "2" ?
                      <Text style={{color:'#fff',fontSize:10,marginTop:5,backgroundColor: 'transparent'}}>开播时间：{this.props.liveRoomInfo.start_time}</Text>
                      :null
                  }
              </View>
          }
        }
    }
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
    // 停止推流
    stopPush = () => {
      if (platform === 'ios') {
        LiveComponent.stopPush()
      }
      post('mv1/user/live/close', {id: this.props.id})
    }
    //旋转摄像头
    rotateCamera = () => {
      if (platform === 'ios') {
        LiveComponent.rotateCamera();
      }
    }
    //刷新视频播放
    refreshVideo = () => {
      if (platform === 'ios' && this.props.caster_status == 1) {
        // IOSPlayStreaming.stopPlay()
        IOSPlayStreaming.addPlayUrl(this.props.liveRoomInfo.flv_downstream_address)
        // IOSPlayStreaming.addPlayUrl('http://2000.liveplay.myqcloud.com/live/2000_44c6e64e79af11e69776e435c87f075e.flv')
      }
    }

    //判断是否登录，没有跳到登录页
    ifNotAuthedToLogin = () => {
      if (this.props.user.user_ticket === "") {
        this.state.isFull && platform==='android' ? this.onFullScreen() : null
        this.alert()
        return false
      }
      return true;
    }
    //文字弹出
    togglePayText = () => {
      this.setState({emitPayText: !this.state.emitPayText})
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
                this.state.isFull ? this.onFullScreen() : null
                Actions.LoginScreen({liveId: this.props.id});
              }
            },
          ],
          {cancelable: false}
      )
      :
      Actions.LoginScreen({liveId: this.props.id});
    }
    goPage(index){
        if(platform == "android"){
            this.viewPager.setPageWithoutAnimation(index);
            this.setState({page:index});
        }
    }
    _renderPage(index){
        switch (index) {
          case 0:
            return(
              <View style={{flexDirection:'column',justifyContent:'space-between',width:global_width}}>
                  <ScrollView>
                    <AnchorInformation
                         data={this.props.liveUserinfoData}
                         {...this.props.liveRoomInfo}
                         type="1"
                         addFollow={() => {
                         if (this.props.user.user_ticket) {
                           this.props.changeLiveFavorite(this.props.liveUserinfoData.user_id)
                         } else {
                           this.alert()
                         }
                        }}
                        MemberNum={this.props.liveChatRoom.MemberNum}
                      />
                 </ScrollView>

                 {
                   this.props.liveChatRoom.redPockets.length > 0 ?
                       <View style={{height:39,position:'absolute',top:80}}>
                         <RedPocketMsg data={this.props.liveChatRoom.redPockets} isFull={this.state.isFull} num={this.state.num} onChangeNum={(num)=>this.setState({num})}/>
                       </View> : <View/>
                 }

                 <Chat data={this.props.liveChatRoom.message} style={{flex:20}}/>
                 <Interaction
                   {...this.props}
                   text={this.state.text}
                   onChangeText={(text) => this.setState({text})}
                   clearInput={() => this.setState({text: ''})}
                   ifNotAuthedToLogin={this.ifNotAuthedToLogin}
                   emotions={webim.Emotions}
                   user={this.props.user}
                   isFull={this.state.isFull}
                   type="Portrait" />
              </View>
            )
            break;
          case 1:
            return(
              <View style={{width:global_width,justifyContent:'center',alignItems:'center'}}>
                <Courseware data={this.props.CoursewareData}/>
              </View>
            )
            break;
          case 2:
              return(
                <View style={{width:global_width}}>
                  <AnchorInformation
                      data={this.props.liveUserinfoData}
                      {...this.props.liveRoomInfo}
                      type="1"
                      addFollow={() => {
                      if (this.props.user.user_ticket) {
                        this.props.changeLiveFavorite(this.props.liveUserinfoData.user_id)
                      } else {
                        this.alert()
                      }
                     }}
                      MemberNum={this.props.liveChatRoom.MemberNum}
                  />
                  <LiveIntroduce data={this.props.liveUserinfoData} />
                </View>
              )
              break;
          case 3:
            return(
              <View style={{width:global_width}}>
                  <HistoricalReview data={this.props.historyreviewData} is_favorite={this.props.liveRoomInfo.is_favorite} user={this.props.user} xz_live_id={this.props.xz_live_id}/>
              </View>
            )
            break;
          default:
           return <View navigator={this.props.navigator}/>
        }

      }
      //自动隐藏Tools
    onStart(){
        // this.timer = setInterval(
        //   ()=>{
        //     if(this.state.autoTool && this.state.isFull){
        //       this.setState({autoTool:false})
        //     }
        //   },
        //   20000,
        // );
    }
    //播放模式切换
    onFullScreen = () =>{
      //正常播放
      if(!this.state.isFull){
        platform==='ios' && this.props.caster_status !== 1 && this.orientation!=='PORTRAIT' ? Orientation.lockToPortrait() : null
        platform==='ios' ? Orientation.lockToLandscapeRight() : Orientation.lockToLandscape() //横屏
        this.setState({isFull:true,w:global_height,h:global_width})
        //this.onStart()
      }else{
        platform==='ios' && this.props.caster_status !== 1 && this.orientation=='PORTRAIT' ? Orientation.lockToLandscapeRight() : null
        Orientation.lockToPortrait() //竖屏
        if(this.state.zoom){ //小屏幕
          this.setState({zoom:false})
          if(platform ==='ios'){
           this.props.caster_status === 1 ? LiveComponent.zoomSize(false) : IOSPlayStreaming.zoomSize(false)
         }else{
           LiveNativeModule.fullScreen(true)
         }
        }
        this.setState({isFull:false,w:global_width,h:global_width*9/16})
        // clearInterval(this.timer)
      }
    }
    //分屏缩放播放器
    onVideoZoom = () =>{
      if(this.state.zoom){ //小屏幕
        this.setState({zoom:false})
        if(platform ==='ios'){
         this.props.caster_status === 1 ? LiveComponent.zoomSize(false) : IOSPlayStreaming.zoomSize(false)
       }else{
         LiveNativeModule.fullScreen(true)
       }
      }else{ //横屏
        this.setState({zoom:true})
        if(platform ==='ios'){
          this.props.caster_status === 1 ? LiveComponent.zoomSize(true) : IOSPlayStreaming.zoomSize(true)
        }else{
          LiveNativeModule.fullScreen(false);
        }
      }

    }
    //返回上一页
    onBack = async () =>{
      if(this.state.isFull){
        this.onFullScreen()
        return true;
      }else{
        //退出直播间 关闭视频
        if(platform ==='ios'){
          IOSPlayStreaming.stopPlay();
          Orientation.removeOrientationListener(this._orientationDidChange);
        }else{
          LiveNativeModule.stopPlay();
          BackAndroid.addEventListener('hardwareBackPress', this.onExitApp);
        }
        this.setState({showViewPager:true})
        // clearInterval(this.timer)
        //退房间后更新在线人数
        if(this.props.liveRoomInfo && this.props.liveRoomInfo.user_name){
            await post('mv1/live/quit-online-num', {user_name: this.props.liveRoomInfo.user_name,channel_id:this.props.liveRoomInfo.channel_id,id:this.props.liveRoomInfo.id})
            this.quitBigGroup();
            this.logout();
        }
        this.props.clearLiveRomm()
        setTimeout(()=>{
            Actions.Live();
        },0)
        return true;
      }
      return false;
    }
    onExitApp = () => {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
       BackAndroid.exitApp();
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT)
      return true;
    };
    render(){
      // console.log('sdsfsfdsf'+JSON.stringify(this.props.liveChatRoom.redPockets));
        const is_caster = this.props.liveRoomInfo && this.props.user && this.props.liveRoomInfo.live_user_id == this.props.user.user_id;
        return(
            <View style={styles.containter}>
              <LinearGradient
                  locations={[0, 0.3, 0.7, 1]}
                  // colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                  colors={['rgba(0,0,0,1)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)', 'rgba(0,0,0,1)']}
                  style={this.state.zoom ?
                          [styles.videoZoom,{width:this.state.w/3,height:this.state.h/3,bottom:0,right:0,zIndex:12}]
                          : this.state.isFull ? {width:this.state.w, height:this.state.h}: {width:this.state.w, height:this.state.w*9/16}}
              >
                   {
                     renderIf(this.props.caster_status !== 1 && platform === "ios" && !this.state.stop, <IOSPlayStreaming/>)
                   }
                   {
                     renderIf(this.props.caster_status === 1 && platform === "ios", <LiveComponent/>)
                   }
                   {
                     this.renderStreaming(is_caster)
                   }

               </LinearGradient>
               {this.props.caster_status === 1 && platform === "ios" ?
                  <View style={[styles.liveTitle,{width:this.state.w}]}>
                    <CastHeader  {...this.props.liveRoomInfo}
                                 {...this.props.liveChatRoom}
                                  onQuitPress={() => {
                                    this.casterQuitMsg();
                                    this.stopPush();
                                    this.quitBigGroup();
                                    this.logout();
                                    this.props.clearLiveRomm()
                                  }}
                                  rotateCamera={this.rotateCamera}
                    />
                  </View>
                  :
                   <View style={[!this.state.isFull ? styles.liveTitle : styles.liveTitleFull,{width:this.state.w}]}>
                            <LiveTitle
                                {...this.props}
                                back={()=>{this.onBack()}}
                                title={this.props.liveRoomInfo.course_name}
                                from="liveroom"
                                />
                  </View>
                }
                {
                  this.state.zoom ?
                  <View style={{width:this.state.w/3,height:this.state.h/3,backgroundColor:'rgba(0,0,0,0)',position:'absolute',zIndex:13,bottom:0,right:0}}>
                      <TouchableOpacity onPress={()=>{this.onVideoZoom()}}>
                          <Text style={{width:this.state.w/3,height:this.state.h/3,backgroundColor:'rgba(0,0,0,0)'}}></Text>
                      </TouchableOpacity>
                  </View>
                  :
                  <View/>
                  //弹幕消息显示
                  //<BarrageLists data={this.props.liveChatRoom.barrages} removeBarrage={this.props.remove_barrage} height={this.state.w*9/16} width={this.state.w}/>
                }
                {this.state.isFull ?
                    this.state.zoom ?
                    <View style={{width:global_height+10,height:global_width,zIndex:11}}>
                      <FullScreenCourseware data={this.props.CoursewareData} isAnchor={this.props.caster_status === 1}/>
                    </View>
                    :
                    this.props.caster_status === 1 && platform === "ios" ?
                    <View style={[styles.chat,{width:this.state.w}]}>
                        <View style={styles.chatLayout}>
                          <View style={{width:this.state.w/2,height:this.state.h-85}}>
                            <View/>
                            {
                              this.props.liveChatRoom.redPockets.length > 0 ?
                                  <View style={{height:39}}>
                                    <RedPocketMsg data={this.props.liveChatRoom.redPockets} isFull={this.state.isFull} is_caster={this.props.caster_status === 1}/>
                                  </View> : <View/>
                            }
                            <Chat data={this.props.liveChatRoom.message} style={{flex:3}}/>
                          </View>
                          <View style={{width:50,height:50}}>
                            <TouchableOpacity style={styles.icon_course} underlayColor={'yellow'} onPress={()=>{this.onVideoZoom()}}>
                                <Ionicons name="ios-book-outline" size={25} color="#ffffff" />
                                <Text style={styles.textStyle}>课件</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                    :
                    <View style={[styles.chat,{width:this.state.w}]}>
                      <View style={styles.chatLayout}>
                        <View style={{height:platform==="android"?this.state.h-110:this.state.h-85,flex:2}}>
                          <View style={styles.tool}>
                              <CastUserInfo
                                  is_caster={is_caster}
                                  {...this.props.liveRoomInfo}
                                  type={"castor"}
                                  onPress={() => {
                                    if (this.ifNotAuthedToLogin()) {
                                      this.props.changeLiveFavorite(this.props.liveUserinfoData.user_id)
                                    }
                                  }}
                              />
                              <View style={{flex:2}}/>
                          </View>
                          {
                            renderIf(!this.state.emitPayText && this.props.liveChatRoom.redPockets.length > 0 ,
                               <View style={{height:39,position:'absolute',top:50}}>
                                <RedPocketMsg data={this.props.liveChatRoom.redPockets} isFull={this.state.isFull} num={this.state.num} onChangeNum={(num)=>this.setState({num})}/>
                                <View style={{flex:2}}/>
                              </View>)
                          }
                          {
                            renderIf(!this.state.emitPayText, <Chat data={this.props.liveChatRoom.message} style={{flex:1}}/>)
                          }
                        </View>
                        <View style={{width:50,height:50}}>
                          <TouchableOpacity style={styles.icon_course} underlayColor={'yellow'} onPress={()=>{this.onVideoZoom()}}>
                              <Ionicons name="ios-book-outline" size={25} color="#ffffff" />
                              <Text style={styles.textStyle}>课件</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                      <Interaction
                              {...this.props}
                              text={this.state.text}
                              onChangeText={(text) => this.setState({text})}
                              clearInput={() => this.setState({text: ''})}
                              onFocus={()=>{
                                // clearInterval(this.timer)
                              }}
                              onBlur={()=>this.onStart()}
                              togglePayText={this.togglePayText}
                              money={this.props.livePay.textPayNums}
                              ifNotAuthedToLogin={this.ifNotAuthedToLogin}
                              emitPayText={this.state.emitPayText}
                              refreshVideo={this.refreshVideo}
                              emotions={webim.Emotions}
                              type="Landscape"/>
                    </View>
                  :
                  <View style={[styles.fullscreen,{top:this.state.w*9/16-48}]}>
                    <TouchableOpacity underlayColor={'yellow'} onPress={()=>{this.onFullScreen()}}>
                        <FontAwesome name="arrows-alt" size={20} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                }
                <View style={{height:48,flexDirection:"row",alignItems:"center",backgroundColor:"white",borderBottomWidth:1,borderBottomColor:"#e0e0e0",width:global_width}}>
                    <TouchableWithoutFeedback onPress={()=>{this.goPage(0)}}>
                        <View style={styles.classify}>
                            <Text style={this.state.page==0?{color:"#00A6EA"}:{}}>聊天室</Text>
                                <View style={styles.currentpos}>
                                    {this.state.page==0 &&
                                        <FontAwesome name="sort-up" size={18} color="#00A6EA"/>
                                    }
                                </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.goPage(1)}}>
                        <View style={styles.classify}>
                            <Text style={this.state.page==1?{color:"#00A6EA"}:{}}>课件</Text>
                            <View style={styles.currentpos}>
                                {this.state.page==1 &&
                                    <FontAwesome name="sort-up" size={18} color="#00A6EA"/>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.goPage(2)}}>
                        <View style={styles.classify}>
                            <Text style={this.state.page==2?{color:"#00A6EA"}:{}}>主播详情</Text>
                            <View style={styles.currentpos}>
                                {this.state.page==2 &&
                                    <FontAwesome name="sort-up" size={18} color="#00A6EA"/>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>{this.goPage(3)}}>
                        <View style={styles.classify}>
                            <Text style={this.state.page==3?{color:"#00A6EA"}:{}}>历史回看</Text>
                            <View style={styles.currentpos}>
                                {this.state.page==3 &&
                                    <FontAwesome name="sort-up" size={18} color="#00A6EA"/>
                                }
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                {
                    renderIf(this.props.showPayModal,
                        <PayModal {...this.props}
                        isFull={this.state.isFull}
                        />)
                }
                {
                  renderIf(this.props.showCheckoutModal,
                    <CheckoutPayment
                        {...this.props}
                        text={this.state.text}
                        isFull={this.state.isFull}
                        clearInput={() => this.setState({text: ''})}
                    />
                  )
                }
                {platform === 'android' ?
                    <ViewPagerAndroid
                        onPageSelected={(e)=>{this.setState({page: e.nativeEvent.position})}}
                        style={{flex:1}}
                        ref={viewPager => { this.viewPager = viewPager; }}
                        initialPage={0}>
                          <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}}>
                              <AnchorInformation
                                    data={this.props.liveUserinfoData}
                                    {...this.props.liveRoomInfo}
                                    type="1"
                                    addFollow={() => {
                                    if (this.ifNotAuthedToLogin()) {
                                      this.props.changeLiveFavorite(this.props.liveUserinfoData.user_id)
                                    }
                                   }}
                                   MemberNum={this.props.liveChatRoom.MemberNum}
                              />
                              {
                                renderIf(this.props.liveChatRoom.redPockets.length > 0 ,
                                    <View style={{height:39}}>
                                      <RedPocketMsg data={this.props.liveChatRoom.redPockets} isFull={this.state.isFull} num={this.state.num} onChangeNum={(num)=>this.setState({num})}/>
                                    </View>)
                              }
                              <Chat data={this.props.liveChatRoom.message} style={{flex:3}}/>
                              <Interaction
                                {...this.props}
                                text={this.state.text}
                                onChangeText={(text) => this.setState({text})}
                                clearInput={() => this.setState({text: ''})}
                                ifNotAuthedToLogin={this.ifNotAuthedToLogin}
                                emotions={webim.Emotions}
                                type="Portrait"
                                user={this.props.user}
                                />
                         </View>

                         <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Courseware data={this.props.CoursewareData}/>
                         </View>

                         <View style={{flex:1}}>
                            <AnchorInformation
                                 {...this.props.liveRoomInfo}
                                type="1"
                                data={this.props.liveUserinfoData}
                                addFollow={() => {
                                  if (this.ifNotAuthedToLogin()) {
                                    this.props.changeLiveFavorite(this.props.liveUserinfoData.user_id)
                                  }
                                }}
                                 MemberNum={this.props.liveChatRoom.MemberNum}
                            />
                            <LiveIntroduce data={this.props.liveUserinfoData} />
                         </View>

                         <View>
                          <HistoricalReview data={this.props.historyreviewData} is_favorite={this.props.liveRoomInfo.is_favorite} user={this.props.user} xz_live_id={this.props.liveRoomInfo.xz_live_id}/>
                         </View>


                    </ViewPagerAndroid>
                    :
                    !this.state.showViewPager
                    ?
                    <ViewPager
                      dataSource={this.state.dataSource}
                      renderPage={(data)=>this._renderPage(data.key)}
                      initialPage={0}
                      animation = {(animatedValue, toValue, gestureState) => {
                        var velocity = Math.abs(gestureState.vx);
                        var baseDuration = 300;
                        var duration = (velocity > 1) ? 1/velocity * baseDuration : baseDuration;

                        return Animated.timing(animatedValue,
                        {
                          toValue: toValue,
                          duration: duration,
                          easing: Easing.out(Easing.exp)
                        });
                      }}
                      onChangePage={(page)=>{
                        this.setState({page})
                      }}
                      ref={viewPager => { this.viewPager = viewPager; }}/>
                    :null
                }
            </View>
        )
    }
}

const mapStateToProps = ({liveWatchRoom, user, livePay, liveChatRoom,anchorRoomUserinfo,coursewareList,historicalReviewList,common}) => {
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
    liveChatRoom: liveChatRoom,
    liveUserinfoData:anchorRoomUserinfo.liveUserinfoData,
    CoursewareData: coursewareList.CoursewareData,
    historyreviewData:historicalReviewList.historyreviewData,
    loading:common.loading,
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
  changeCasterIsOnLine,
})(AnchorRoom)

const styles = StyleSheet.create({
    containter:{
        flex:1,
    },
    liveTitle:{
      position:'absolute',
      top:platform=='ios' ? 20 : 5,
      zIndex:120,
      width:global_width,
      height:40,
    },
    liveTitleFull:{
      position:'absolute',
      top:0,
      zIndex:120,
      width:global_width,
      height:40,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    fullscreen:{
      position:'absolute',
      right:10,
      zIndex:119,
      borderRadius: 100,
      width: 30,
      height: 30,
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgba(0,0,0,0.4)',
    },
    classify:{
        flex:1,alignItems:"center",borderRightWidth:1,borderColor:'#ECECEC',
    },
    videoZoom:{
      position:'absolute',
      right:0,
      bottom:0,
      zIndex:11,
      // backgroundColor:'yellow',
    },
    chatLayout:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingHorizontal:10,
    },
    icon_course:{
      borderRadius: 100,
      width: 50,
      height: 50,
      flex:1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#218bca',
    },
    textStyle:{
      textAlign:'center',
      color:'#fff',
      fontSize:10,
    },
    currentpos:{
        height:6,
    },
    delta:{
        width:13,
        height:6,
    },
    paybg:{
        width:151,
        height:25,
    },
    chat:{
        position:'absolute',
        bottom:0,
        zIndex:10,
        width:global_width,
    },
    tool:{
        justifyContent:'space-between',
        flexDirection:'row',
        paddingTop:10,
    }
})
