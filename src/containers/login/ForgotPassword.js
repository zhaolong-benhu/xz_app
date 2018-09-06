/**
 * Created by qzy on 10/04/2017.
 * File description:
 */
import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {global_height, global_width} from '../../util'
import {Alert, Loading, RepeatImage} from '../../components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {api_sso_captcha} from '../../api/global'

import {getPassword, sendCaptcha} from '../../actions/User';

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: '',
      password: '',
      verifiedCode: '',
      captcha: '',
      confirmPassword: '',
      captchaUrl: api_sso_captcha + '?v=' + Math.random(), //图形验证码api接口
      stop: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sms != nextProps.sms) {
      if (nextProps.sms.flag == 0) {
        this.setState({stop: true});
      }
    }
    //接口返回用户找回密码状态
    if (this.props.password !== nextProps.password) {
      if (nextProps.password.flag == 0) {
        this.setState({stop: false});
        Alert('密码找回成功，请重新登录~');
        Actions.pop();
      }
    }
  }

  pressPassBtn() {
    const {mobile, verifiedCode, password, confirmPassword} = this.state;
    if (!verifiedCode) {
      Alert('请输入手机验证码');
    } else if (!password) {
      Alert('请输入密码，包含6-20位字母或数字组成');
    } else if (password.length < 6) {
      Alert('密码不得少于6位');
    } else if (!/^[A-z0-9]{6,20}$/.test(password)) {
      Alert('请输入密码包含6-20位的字母或数字组成');
    } else if (!confirmPassword) {
      Alert('请输入确认密码');
    } else if (confirmPassword != password) {
      Alert('两次密码不一致');
    } else {
      this.props.getPassword(mobile, verifiedCode, password);
    }
  }

  //获取手机验证码
  handleSendSMS() {
    const {mobile, captcha} = this.state;
    if (!mobile) {
      Alert('请输入手机号码');
  } else if (!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(mobile)) {
      Alert('手机号码格式有误');
    } else if (!captcha) {
      Alert('请输入验证码');
    } else if (!/^[A-z0-9]{4,6}$/.test(captcha)) {
      Alert('请输入正确的图片验证码');
    }
    else {
      this.props.sendCaptcha(mobile, captcha, 1);
      this.setState({captchaUrl: api_sso_captcha + '?v=' + Math.random()})
    }
  }

  render() {
    return (
        <View style={styles.wrapper}>
          <StatusBar
              barStyle='light-content'
          />
            <View style={styles.mainWrapper}>
              {!this.state.stop &&
              <View>
                <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholderTextColor={"#C9C9CB"}
                      placeholder={"请输入您的手机号码"}
                      keyboardType='number-pad'
                      clearButtonMode="while-editing"
                      underlineColorAndroid={'transparent'}
                      onChangeText={(mobile) => this.setState({mobile})}
                      value={this.state.mobile}
                  />
                </View>
                <View style={{backgroundColor:'#C9C9CB',height:0.5,marginLeft:20}}/>
                <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholderTextColor={"#C9C9CB"}
                      placeholder={"请输入验证码"}
                      clearButtonMode="while-editing"
                      underlineColorAndroid={'transparent'}
                      onChangeText={(captcha) => this.setState({captcha})}
                      value={this.state.captcha}
                  />
                  <TouchableHighlight style={styles.captcha} underlayColor={'rgba(255,255,255,0.4)'}
                                      onPress={() => this.setState({captchaUrl: api_sso_captcha + '?v=' + Math.random()})}>
                    <Image source={{uri: this.state.captchaUrl}} style={styles.captcha}/>
                  </TouchableHighlight>
                </View>
                <View style={styles.btnMain}>
                  <TouchableHighlight underlayColor={'rgba(47,151,234,0.8)'} style={styles.btnWrapper}
                                      onPress={() => this.handleSendSMS()}>
                    <View>
                      <Text style={styles.btnText}>发送</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              }
              {this.state.stop &&
              <View>
                <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholderTextColor={"#C9C9CB"}
                      placeholder={"请输入手机验证码"}
                      clearButtonMode="while-editing"
                      underlineColorAndroid={'transparent'}
                      onChangeText={(verifiedCode) => this.setState({verifiedCode})}
                      value={this.state.verifiedCode}
                  />
                </View>
                <View style={{backgroundColor:'#C9C9CB',height:0.5,marginLeft:20}}/>
                <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholderTextColor={"#C9C9CB"}
                      placeholder={"请输入密码，6-20位字母或数字组成"}
                      clearButtonMode="while-editing"
                      secureTextEntry={true}
                      underlineColorAndroid={'transparent'}
                      onChangeText={(password) => this.setState({password})}
                      value={this.state.password}
                  />
                </View>
                <View style={{backgroundColor:'#C9C9CB',height:0.5,marginLeft:20}}/>
                <View style={styles.inputWrapper}>
                  <TextInput
                      style={styles.input}
                      placeholderTextColor={"#C9C9CB"}
                      placeholder={"再次确认密码"}
                      clearButtonMode="while-editing"
                      secureTextEntry={true}
                      underlineColorAndroid={'transparent'}
                      onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                      value={this.state.confirmPassword}
                  />
                </View>
                <View style={styles.btnMain}>
                  <TouchableHighlight style={styles.btnWrapper} underlayColor={'rgba(47,151,234,0.8)'}
                                      onPress={() => this.pressPassBtn()}>
                    <View>
                      <Text style={styles.btnText}>保存</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
              }
            </View>
            {this.props.loading ? <Loading/> : null}
        </View>
    );
  }
}

const mapStateToProps = ({user, common}) => {
  return {
    password: user.password,
    sms: user.sms,
    loading: common.loading,
  }
}
export default connect(mapStateToProps, {getPassword, sendCaptcha})(ForgotPassword);

const styles = StyleSheet.create({
  btnMain: {
    paddingTop: 30,
    justifyContent:'center',width:global_width,alignItems: 'center',backgroundColor: '#E5E5E5',
  },
  btnWrapper: {
    backgroundColor: '#0A93FF',
    height: 40,
    width: global_width * 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  btnText: {color: '#fff', fontSize: 16},
  mainWrapper: {zIndex: 10, marginTop: global_height*0.1,alignItems: 'center',backgroundColor: '#fff',},
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
  captcha: {width: 78, height: 30, borderRadius: 3},
})
