/**
 * Created by zhaolong on 2017/03/23.
 * File description:学习中心
 */
'use strict'

import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity,
  NativeModules,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {global_width, global_height} from '../../util/screen';
import Orientation from 'react-native-orientation';
import {platform} from '../../util/platform';
import {glo_url,api_isLiveUser} from '../../api/global';
import {fetchUserinfoDetailData, UploadAvatar} from '../../actions/UserInfo';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Alert as alert} from '../../components';
import { post } from '../../helpers/helpers';
import * as CacheManager from 'react-native-http-cache';
const LiveNativeModule = NativeModules.LiveNativeModule;

class User extends Component {
  state = {
    headBg: require('../../static/images/user/headBg.png'),
    editInfo: require('../../static/images/user/editInfo.png'),
    headPic: require('../../static/images/user/head.jpg'),
    cacheSize: 0
  }

  constructor(props){
    super(props);
    this.courseId="0";
  }
	componentWillMount(){
		if(this.props.user.user_ticket !== ''){
			this.props.fetchUserinfoDetailData();
		}
	}

  componentDidMount() {
    this._getCacheSize();
  }
  componentWillReceiveProps(nextProps){
    if(this.props.user!==nextProps.user){
				if(nextProps.user && nextProps.user.user_ticket){
          	this.props.fetchUserinfoDetailData();
        }
    }
  }
  async pressGoLive(live_status) {
      if(this.props.user && this.props.user.user_ticket){
        try {
            switch (live_status) {
              case "1":
                const res = await post('/mv1/user/live/get-live-auth')
                if(res && res.id){
                  //跳转直播准备页面
                  if(platform === "ios"){
                    let initial = Orientation.getInitialOrientation();
                    if (initial === 'PORTRAIT') {
                        Orientation.lockToLandscapeRight() //横屏
                    }
                    Actions.LiveReady({id: res.id})
                  }else{
                    this.courseId=res.id;
                    LiveNativeModule.LivePublisher(res.id,this.props.user.user_ticket)
                  }
                }
                break;
              case "2":
                //申请未通过
                Actions.XZWebView({title:'提交审核',url:glo_url+'/tutorregister/verify/2'});
                break;
              case "0":
                //申请已提交
                Actions.XZWebView({title:'提交审核',url:glo_url+'/tutorregister/verify/3'});
                break;
              default:
                Actions.XZWebView({title:'主播报名',url:glo_url+'/live/enroll'});
                break;
            }
        } catch (err) {
          if(this.courseId!="0"){
            LiveNativeModule.LivePublisher(this.courseId,this.props.user.user_ticket)
          }
        }
      }else{
          platform=='ios' ?
        Alert.alert(
            '提示',
            '请先登录',
            [
              {text: '取消'},
              {text: '登录', onPress: () => Actions.LoginScreen(), },
            ],
            { cancelable: false }
        )
          :
          Actions.LoginScreen();
      }
    //查询是否是主播，跳转触屏和直播页面
  }
  //获取缓存大小
  async _getCacheSize(){
      var size = 0;
      if(platform == "android"){
          size = await CacheManager.getImageCacheSize();
      }else {
          size = await CacheManager.getHttpCacheSize();
      }
      size = (size/1000/1000).toFixed(2);
      if(size > 10)
      {
        size = parseInt(size);
      }
     this.setState({cacheSize:size});
  }
  //清除缓存
  async _clearCache(){
      await CacheManager.clearHttpCache();
      await CacheManager.clearImageCache();
      // await CacheManager.clear();
      this._getCacheSize();
      alert("缓存清除成功");
  }



  //公共分类操作
  AllTouchableActions = (index,num) => {
      if(10== index){
          this._clearCache();
          return;
      }
    if (this.props.userInfoDetail) {
      switch (index) {
        case 0: {
          Actions.Setting({
            user_name: this.props.userInfoDetail.user_name,
            thumb: this.props.userInfoDetail.thumb,
            user_mobile: this.props.userInfoDetail.user_mobile
          });
        }
          break;
        case 1://消息
        {
          Actions.XZWebView({title: '消息中心', url: glo_url + '/user/message'});
        }
          break;
        case 2://直播关注
        {
          Actions.Follow();
        }
          break;
        case 3://我的关注
        {
          Actions.XZWebView({title: '我的关注', url: glo_url + '/user/follow'});
        }
          break;
        case 4://我的余额
        {
          Actions.XZWebView({title: '我的钱包', url: glo_url + '/user/wallet'});
        }
          break;
        case 5://订单管理
        {
            // if(0 == num){
            //     Alert("暂无订单数据！");
            // }else {
            //     Actions.Orderlist({num:num});
            // }
            Actions.Orderlist({num:num});
        }
          break;
        case 6://我要赚钱
        {
          Actions.XZWebView({title: '我要赚钱', url: glo_url + '/user/makemoney/0'});
        }
          break;
        case 7://申请成为导师
        {
          Actions.XZWebView({title: '用户中心', url: glo_url + '/user/Apply'});
        }
          break;
        case 8://上传课程管理
        {
          Actions.XZWebView({title: '上传课程管理', url: glo_url + '/user/coursemanage'});
        }
          break;
        case 9://反馈意见
        {
          Actions.Feedback();
        }
          break;
        default:
      }
    } else {
      platform=='ios' ?
      Alert.alert(
          '提示',
          '是否需要登录',
          [
            {text: '取消', style: 'cancel'},
            {
              text: '登录', onPress: () => {
                Actions.LoginScreen();
              }
            },
          ],
          { cancelable: false }
      )
      :
      Actions.LoginScreen();
    }
  }

  render() {
    const {user, userInfoDetail} = this.props;
    var detail = userInfoDetail;
    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps={true}>
          <StatusBar barStyle='light-content'/>
          <View style={styles.head}>
            <Image style={styles.bg} source={this.state.headBg}/>
            <View style={{position: 'absolute', top: 0, width: global_width}}>
              <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(0)}>
                <View style={styles.edit}>
                  <Image style={styles.editBg} source={this.state.editInfo}/>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.headBg} onPress={() => this.AllTouchableActions(0)}>
                {(() => {
                  if (this.props.userInfoDetail && this.props.userInfoDetail.thumb) {
                    return <Image style={styles.headPic} source={{uri: this.props.userInfoDetail.thumb}}/>
                  } else {
                    return <Image style={styles.headPic} source={this.state.headPic}/>
                  }
                })()}

              </View>

              {(() => {
                if (this.props.userInfoDetail && this.props.userInfoDetail.user_name) {
                  return <Text style={styles.userName}>{this.props.userInfoDetail.user_name}</Text>
                } else {
                  return <View style={styles.unlogin}>
                    <Text style={styles.loginText} onPress={() => Actions.LoginScreen()}>登录 / </Text>
                    <Text style={styles.loginText} onPress={() => Actions.MainRegister()}>注册</Text>
                  </View>
                }
              })()}

            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(1)}>
            <View style={styles.message}>
              <Text style={styles.msg}>消息</Text>
              {(() => {
                if (this.props.userInfoDetail) {
                  return <Text style={styles.num}>{this.props.userInfoDetail.message_num}</Text>
                }
              })()}
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(2)}>
            <View style={styles.item}>
              <Text style={styles.msg2}>主播关注</Text>
              {(() => {
                if (detail) {
                  return <Text style={styles.num}>{detail.live_user_favorite_num}</Text>
                }
              })()}
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(3)}>
            <View style={styles.item}>
              <Text style={styles.msg2}>我的关注</Text>
              {(() => {
                if (detail) {
                  return <Text style={styles.num}>{detail.favorite_num}</Text>
                }
              })()}
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(4)}>
            <View style={styles.item}>
              <Text style={styles.msg2}>我的余额</Text>
              {detail ?
                  <Text style={styles.num}>{detail.user_money}</Text>
                  :
                  null
              }
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableWithoutFeedback>

          {(() => {
            if (detail) {
              return <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(5,detail.order_num)}>
                <View style={styles.message}>
                  <Text style={styles.msg}>订单管理</Text>
                  {/* {(() => {
                    if (detail) {
                      return <Text style={styles.num}>{detail.order_num}</Text>
                    }
                  })()} */}
                  <Text style={styles.num}>{detail.order_num}</Text>
                  {(() => {
                    if (platform == "android") {
                      return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                                   name="ios-arrow-forward-outline"/>
                    } else {
                      return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                                   name="ios-arrow-forward-outline"/>
                    }
                  })()}
                </View>
              </TouchableWithoutFeedback>
            }
          })()}

          {/*<TouchableWithoutFeedback onPress={() => this.AllTouchableActions(6)}>
            <View style={styles.message}>
              <Text style={styles.msg}>我要赚钱</Text>
              {(() => {
                if (detail) {
                  return <Text style={styles.num}>{detail.invite_num}</Text>
                }
              })()}
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableWithoutFeedback>*/}

          {(() => {
            if (detail && detail.teacher_status == 1) {
              return <View>
                <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(8)}>
                  <View style={styles.message}>
                    <Text style={styles.msg}>上传课程管理</Text>
                    {(() => {
                      if (detail) {
                        return <Text style={styles.num}>{detail.upload_course_num}</Text>
                      } else {
                        if (platform == "android") {
                          return <Icon
                              style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                              name="ios-arrow-forward-outline"/>
                        } else {
                          return <Icon
                              style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                              name="ios-arrow-forward-outline"/>
                        }
                      }
                    })()}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            } else {
              return <View>
                <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(7)}>
                  <View style={styles.message}>
                    <Text style={styles.msg}>申请为导师</Text>
                    {(() => {
                      if (platform == "android") {
                        return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                                     name="ios-arrow-forward-outline"/>
                      } else {
                        return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                                     name="ios-arrow-forward-outline"/>
                      }
                    })()}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            }
          })()}
          {/* 0 未审核 1 审核通过 2 审核未通过 3未申请 */}
          <TouchableWithoutFeedback onPress={() => this.pressGoLive(detail && detail.live_user_status)}>
            <View style={styles.message}>
              <Text style={styles.msg}>{detail && detail.live_user_status ==1 ? "我要开播" : "申请为主播"}</Text>
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => this.AllTouchableActions(9)}>
            <View style={styles.message}>
              <Text style={styles.msg}>反馈意见</Text>
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableWithoutFeedback>

          <TouchableOpacity onPress={() => this.AllTouchableActions(10)} style={{marginBottom:30}}>
            <View>
              <Text style={styles.msg}>清除缓存</Text>
              <Text style={styles.num}>{this.state.cacheSize}M</Text>
              {(() => {
                if (platform == "android") {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 14, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                } else {
                  return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                               name="ios-arrow-forward-outline"/>
                }
              })()}
            </View>
          </TouchableOpacity>
        </ScrollView>
    )
  }

}

const mapStateToProps = ({user, userInfo, common}) => {
  return {
    user: user.userInfo,
    userInfoDetail: userInfo.userInfoDetail,
    loading: common.loading,
  }
}

export default connect(mapStateToProps, {fetchUserinfoDetailData})(User)

var styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
    top:-20
  },
  head: {
    width: global_width,
    height: 220
  },
  bg: {
    width: global_width,
    height: 220
  },
  edit: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 10,
    top: 40,
  },
  editBg: {
    width: 24,
    height: 24,
  },
  headBg: {
    position: 'absolute',
    top: 75,
    left: global_width / 2 - 40,
    width: 80,
    height: 80,
  },
  unlogin: {
    marginLeft: global_width / 2 - 37,
    flexDirection: 'row',
    height: 30,
    position: 'absolute',
    top: 180,
    // backgroundColor:'red',
    width:74
  },
  loginText: {
    fontSize:16
  },
  headPic: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  userName: {
    position: 'absolute',
    top: 180,
    width: global_width,
    textAlign: 'center',
    fontSize: 15,
    color: '#333333'
  },
  message: {
    borderColor: '#EEEEEE',
    borderBottomWidth: 10,
  },
  message2: {
    borderColor: '#EEEEEE',
    borderBottomWidth: 10,
    marginBottom: 70,
  },
  msg: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#333333',
    paddingBottom: 14,
    paddingTop: 14,
  },
  msg2: {
    fontSize: 16,
    color: '#333333',
    paddingTop: 14,
    paddingBottom: 14,
  },
  num: {
    fontSize: 16,
    color: '#999999',
    position: 'absolute',
    right: 20,
    top: 10
  },
  item: {
    marginLeft: 10,
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
  }
})
