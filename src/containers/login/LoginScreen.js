/**
 * Created by qzy on 10/04/2017.
 * File description:
 */
import React, {Component} from "react";
import {
  BackAndroid,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Animated,
  Keyboard,
  ToastAndroid,
} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {global_height, global_width,platform} from "../../util";
import {Alert, Loading, RepeatImage} from "../../components";
// import * as WeChat from 'react-native-wechat';
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import {getLiveWatchRoom, userLogin} from "../../actions";

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      verifiedCode: '',
    }
    //应用注册
		// WeChat.registerApp('wx73800982503ff96f');
  }

  componentWillMount() {
    if (global.islogin) {
      global.popNum = global.popNum + 1;
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      BackAndroid.addEventListener('hardwareBackPress', () => {
        if (global.islogin) {
          Actions.XZWebView({url: this.props.url, title: global.title});
          return true;
        } else {
          Actions.pop()
          return true;
        }
        return false;
      })
    }
  }

  componentWillUnMount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', null);
    }
  }

  pressLoginBtn() {
    const {userName, password} = this.state;
    if (!userName) {
      Alert('请输入用户名/邮箱/已验证手机号码');
    }
    else if (!password) {
      Alert('请输入密码');
    }
    else {
      this.props.userLogin(userName, password);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user != nextProps.user) {
      if (nextProps.user && nextProps.user.user_ticket) {
        if (nextProps.back && nextProps.back == 'h5') {
          Actions.XZWebView({url: nextProps.url});
        } else if (nextProps.liveId) {
          //todo 不能理解 不延时无法登录聊天
          setTimeout(() => {
            this.props.getLiveWatchRoom(nextProps.liveId);
          }, 500)
          Actions.pop();
        } else {
          Actions.pop();
        }
      }
    }
  }

  render() {
    return (
        <ScrollView style={{flex: 1, width: global_width, height: global_height,backgroundColor:'#E5E5E5'}} keyboardShouldPersistTaps={'always'}>
          <View style={styles.wrapper}>
            <StatusBar barStyle='light-content'/>
            <KeyboardAvoidingView
                 style={styles.mainWrapper}
                 behavior="position"
               >
                <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholderTextColor={"#C9C9CB"}
                      underlineColorAndroid={'transparent'}
                      placeholder={"请输入用户名/邮箱/已验证手机号码"}
                      autoCapitalize="none"
                      clearButtonMode="while-editing"
                      returnKeyType={'next'}
                      onChangeText={(userName) => this.setState({userName})}
                      value={this.state.userName}
                      onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
                <View style={{backgroundColor:'#C9C9CB',height:0.5,marginLeft:20}}/>
                <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholderTextColor={"#C9C9CB"}
                      underlineColorAndroid={'transparent'}
                      placeholder={"请输入密码"}
                      clearButtonMode="while-editing"
                      secureTextEntry={true}
                      onChangeText={(password) => this.setState({password})}
                      value={this.state.password}
                      returnKeyType={'join'}
                      onSubmitEditing={Keyboard.dismiss}
                  />
                </View>
                <View style={styles.tip}>
                  {/*
                  <SimpleLineIcons name="lock-open" color="#FF5D5D" size={14}/>
                  <Text style={styles.error}>用户名或密码不正确</Text>

                  <TouchableHighlight underlayColor={'rgba(255,255,255,0.4)'} onPress={() =>{
          						WeChat.isWXAppInstalled().then((isInstalled) => {
          							if (isInstalled) {
          								WeChat.shareToSession({
          									type: 'text',
          									description: '测试微信好友分享文本'
          								}).catch((error) => {
          									ToastAndroid.show(error.message, ToastAndroid.SHORT);
          								});
          							} else {
          								ToastAndroid.show('没有安装微信软件，请您安装微信之后再试', ToastAndroid.SHORT);
          							}
          						});
          					}}>
                    <Text style={styles.text}>微信分享?</Text>
                  </TouchableHighlight>*/}
                </View>
                <View style={{justifyContent:'center',width:global_width,alignItems: 'center',backgroundColor: '#E5E5E5',}}>
                  <TouchableHighlight style={styles.btn} underlayColor={'rgba(47,151,234,0.8)'}
                                      onPress={() => this.pressLoginBtn()}>
                    <Text style={styles.btnText}>登录</Text>
                  </TouchableHighlight>
                </View>
                <View style={{flex:0,width:global_width,alignItems:'flex-end',justifyContent:'space-between',flexDirection:'row',paddingHorizontal:10,paddingTop:20,backgroundColor: '#E5E5E5',}}>
                  <TouchableHighlight underlayColor={'rgba(32,128,204,0.4)'} onPress={() => Actions.MainRegister()}>
                    <Text style={styles.text}>快速注册</Text>
                  </TouchableHighlight>
                  <TouchableHighlight underlayColor={'rgba(32,128,204,0.4)'} onPress={() => Actions.ForgotPassword()}>
                    <Text style={styles.text}>忘记密码?</Text>
                  </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
            {this.props.loading ? <Loading/> : null}
          </View>
        </ScrollView>

    );
  }
}

const mapStateToProps = ({user, common}) => {
  return {
    user: user.userInfo,
    loading: common.loading,
  }
}

export default connect(mapStateToProps, {userLogin, getLiveWatchRoom})(LoginScreen);


const styles = StyleSheet.create({
  mainWrapper: {zIndex: 10, marginTop: global_height*0.1,alignItems: 'center',backgroundColor: '#fff',},
  tip: {flex: 0, height:30, flexDirection: 'row',paddingHorizontal:10,backgroundColor: '#E5E5E5',},
  error:{marginLeft:5},
  btn: {
    backgroundColor: '#0A93FF',
    height: 45,
    width: global_width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  btnText: {fontSize: 16, color: '#fff'},
  text: {color: '#0A93FF', fontSize: 14,},
  wrapper: {backgroundColor: '#E5E5E5', flex: 1, position: 'relative', alignItems: 'center'},
  inputWrapper: {
    width: global_width,
    height: 45,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
  input: {height: 45, flex: 1, alignSelf: 'center', marginLeft:20, fontSize: 14, color: '#444',padding:0},
  labelStyle: {color: '#fff', fontSize: 12,},
  checkboxStyle: {width: 15, height: 15,},
  bgWrapper: {position: 'absolute', top: 0, left: 0, zIndex: 0, width: global_width * 1.4, height: global_height},
})
