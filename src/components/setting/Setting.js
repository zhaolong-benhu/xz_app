/**
 * Created by zhaolong on 2017/03/29.
 * File description:个人中心-个人设置
 */

'use strict'
import React, {
  Component
} from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  BackAndroid,
  ToastAndroid,
  Platform,
  AlertIOS,
  NativeModules,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight
} from 'react-native';

import RNFS from 'react-native-fs';
import {connect} from 'react-redux';
import {Scene, Router, Actions} from 'react-native-router-flux';

import {global_width, global_height} from '../../util/screen';
import {platform} from '../../util/platform';
import {api_updateavatar} from '../../api/global';
import Mask from '../common/Mask';
import UploadAvatar from './UploadAvatar';
import ModifyNickname from './ModifyNickname';
import {Loading, Alert} from '../../components';
import {glo_url} from '../../api/global';
import {fetchUploadAvatar, fetchModifyNickName} from '../../actions/UserInfo';
import {logout} from '../../actions/User';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// var ImagePicker = NativeModules.ImageCropPicker;
import ImagePicker from 'react-native-image-crop-picker';
class Setting extends Component {

    static defaultProps={
        defaultheadPic:require('../../static/images/user/head.jpg')
    }
  constructor(props) {
    super(props);
    this.UploadAvatar = this.UploadAvatar.bind(this);
    this.user_detail = {"name": this.props.old_name};
    this.state = {
      image: null,
      images: null,
      headPic: this.props.thumb,
      bShowUpload: false,
      bShowModifyNickname: false,
      nickName: this.props.user_name
    };
    if (this.props.new_name && this.props.new_name != "") {
      this.setState({nickName: this.props.new_name});
      this.user_detail.name = this.props.new_name;
      this.props.fetchModifyNickName(this.user_detail);
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.user_ticket !== nextProps.user.user_ticket) {
      if (nextProps.user.user_ticket === '') {
        Alert('退出成功');
        Actions.Home();
      }
    }
  }

  OnBack() {
    Actions.User();
  }

  UploadUserHead() {
    this.setState({
      bShowUpload: true
    });
  }

  ModifyNickname() {
    // Actions.ModifyNickname({nickName:this.state.nickName});
    this.setState({bShowModifyNickname: true});
  }

  //隐藏遮罩层
  HideMask() {
    this.setState({
      bShowUpload: false
    });
  }

  //将图片转成base64
  _convertImageToBase64(img) {
    if (!img) {
      return;
    }
    RNFS.readFile(img, 'base64')
        .then((content) => {
          // content 为base64数据
          console.log("content", content);
          this.UploadAvatar(api_updateavatar, content);
        })
        .catch((err) => {
          console.log("reading error: " + err);
        });
  }

  //请求数据
  UploadAvatar(api, base64) {
    var avatar = "data:image/jpeg;base64," + base64;
    this.props.fetchUploadAvatar(avatar);
  }

  //获取子组件返回的数据
  GetUploadAvatarData(data) {
    this.setState({bShowUpload: false});
    if ("cancel" == data) {
      this.setState({
        bShowUpload: false
      });
    }
    if ("photograph" == data) {
      this.pickSingleWithCamera(true);
      // ToastAndroid.show("相机功能暂时无法使用",ToastAndroid.SHORT);
    }
    if ("choicephone" == data) {
      // ToastAndroid.show("该手机没有任何图片",ToastAndroid.SHORT);
      this.pickSingle(true);
    }
  }

  //获取子组件返回的数据
  GetModifyNicknameData(type, data) {
    this.setState({
      bShowModifyNickname: false
    });
    if ("save" == type) {
      // alert(data);
      this.setState({nickName: data});
      this.user_detail.name = data;
      this.props.fetchModifyNickName(this.user_detail);
    }
  }

  //选择相机拍照
  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
    }).then(image => {
      // console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
      //将图片转成base64
      this._convertImageToBase64(image.path);
    }).catch(e => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: cropit,
      includeBase64: true
    }).then(image => {
      console.log('received base64 image');
      this.setState({
        image: {uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  //选择相册
  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime},
        images: null
      });
      //将图片转成base64
      this._convertImageToBase64(image.path);
    }).catch(e => {
      console.log(e);
      Alert(e.message ? e.message : e);
    });
  }

  renderImage(image) {
    return <Image style={{width: 30, height: 30, marginTop: 5, resizeMode: 'contain'}} source={image}/>
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  renderDefault() {
      if(this.state.headPic){
          return <Image style={{width: 30, height: 30, marginTop: 5, borderRadius: 15}} source={{uri: this.state.headPic}}/>
      }else {
          return <Image style={{width: 30, height: 30, marginTop: 5, borderRadius: 15}} source={this.props.defaultheadPic}/>
      }
  }

  ExitApp(){
      alert(0);
  }

  render() {
    var str = ">";
    var str2 = "<";
    // var user_mobile = this.props.user_mobile;
    // var mobile_start = user_mobile.substr(0,5);
    // var mobile_mantissa =
    return (
        <View style={styles.containter}>
          <View style={styles.emptyDiv}></View>
          <View style={styles.item}>
            <TouchableWithoutFeedback onPress={() => this.UploadUserHead()}>
              <View style={styles.items}>
                <Text style={styles.msg}>头像</Text>
                <View style={styles.userHead}>
                  {this.state.image ? this.renderAsset(this.state.image) : this.renderDefault()}
                </View>
                {(() => {
                  if (Platform == "android") {
                    return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 10, fontSize: 15}}
                                 name="ios-arrow-forward-outline"/>
                  } else {
                    return <Icon style={{color: '#999999', position: 'absolute', right: 10, top: 12, fontSize: 15}}
                                 name="ios-arrow-forward-outline"/>
                  }
                })()}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={() => this.ModifyNickname()}>
            <View style={styles.message}>
              <View style={styles.items2}>
                <Text style={styles.msg2}>昵称</Text>
                <Text style={styles.phone}>{this.state.nickName}</Text>
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
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
              onPress={() => Actions.ChangePassword() }>
            <View style={styles.item}>
              <View style={styles.items}>
                <Text style={styles.msg}>修改密码</Text>
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
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
              onPress={() => Actions.XZWebView({title: '手机号码设置', url: glo_url + '/user/updatemobile'})}>
            <View style={styles.item}>
              <View style={styles.items}>
                <Text style={styles.msg}>修改绑定手机号</Text>
                {(() => {
                  var fromAccountNick = this.props.user_mobile;
                  if (!isNaN(fromAccountNick) && fromAccountNick.length == 11) {
                    fromAccountNick = fromAccountNick.split('');
                    fromAccountNick.splice(3, 5, '*', '*', '*', '*', '*');
                    fromAccountNick = fromAccountNick.join('');
                    return <Text style={styles.phone}>{fromAccountNick}</Text>
                  } else {
                    return <Text style={styles.phone}>当前账号</Text>
                  }
                })()}
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
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => Actions.XZWebView({title: '帮助', url: glo_url + '/user/help'})}>
            <View style={styles.message}>
              <View style={styles.items2}>
                <Text style={styles.msg2}>帮助</Text>
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
            </View>
          </TouchableWithoutFeedback>
          <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} onPress={() => this.props.logout()} style={styles.exit}>
              <View>
                <Text style={styles.exitText}>退出</Text>
              </View>
          </TouchableHighlight>


          {(() => {
            if (this.state.bShowUpload) {
              return <Mask callbackParent={() => this.HideMask()}/>
            }
          })()}
          {(() => {
            if (this.state.bShowUpload) {
              return <UploadAvatar callbackParent={(data) => this.GetUploadAvatarData(data)}/>
            }
          })()}
          {(() => {
            if (this.state.bShowModifyNickname) {
              return <ModifyNickname nickName={this.props.user_name}
                                     callbackParent={(type, data) => this.GetModifyNicknameData(type, data)}/>
            }
          })()}

        </View>
    )
  }
}

const mapStateToProps = ({user, userInfo, common}) => {
  return {
    user: user.userInfo,
    loading: common.loading,
    uploadAvatar: userInfo.uploadAvatar,
    midifyNickname: userInfo.midifyNickname,
  }
}

export default connect(mapStateToProps, {fetchUploadAvatar, fetchModifyNickName, logout})(Setting)

var styles = StyleSheet.create({
  containter: {
    backgroundColor: '#EEEEEE',
    width: global_width,
    height: global_height,
    marginTop: 10,
  },
  emptyDiv: {
    width: global_width,
    height: 50,
    backgroundColor: '#FFFFFF',
  },
  head: {
    paddingTop: 10,
    borderBottomWidth: 10,
    borderColor: '#EEEEEE',
    flexDirection: "row",
    backgroundColor: '#FFFFFF'
  },
  back: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#1a81da'
  },
  userHead: {
    position: 'absolute',
    right: 30,
    width: 30,
    height: 40,
    top: 0,
  },
  headPic: {
    marginTop: 5,
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 18,
    color: '#333333',
    marginLeft: global_width / 2 - 50,
    height: 30
  },
  message: {
    borderColor: '#EEEEEE',
    borderBottomWidth: 10,
    backgroundColor: '#FFFFFF',
  },
  msg: {
    // paddingLeft:5,
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
    paddingLeft: 5
  },
  nikeName: {
    fontSize: 16,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  phone: {
    right: 20,
    position: 'absolute',
    top: 10,
    color: '#999999',
  },
  num: {
    fontSize: 16,
    position: 'absolute',
    right: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  item: {
    paddingLeft: 5,
    // marginTop:5,
    backgroundColor: '#FFFFFF',
  },
  items: {
    marginLeft: 5,
    borderColor: '#ECECEC',
    borderBottomWidth: 1,
  },
  items2: {
    paddingLeft: 5,
    justifyContent: 'center',
  },
  exit: {
    width: global_width,
    height: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitText: {
    color: 'red',
    fontSize: 16
  }
})
