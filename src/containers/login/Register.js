/**
 * Created by qzy on 10/04/2017.
 * File description:
 */
import React, {Component} from 'react';
import {
	View,
	Text,
	TextInput,
	Image,
	StyleSheet,
	ToastAndroid,
	ScrollView,
	TouchableWithoutFeedback,
  KeyboardAvoidingView,
	TouchableHighlight,
	StatusBar,
	Animated,
  Keyboard,
} from 'react-native';

import { connect } from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {global_width, global_height} from '../../util'
import {RepeatImage,Loading,Alert,CountDownTimer} from '../../components';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {fetchUserinfoDetailData} from "../../actions/UserInfo";
import CheckBox from 'react-native-checkbox';
import {api_sso_captcha} from '../../api/global'

import {
	userRegister,
	verifiedCode,
	sendCaptcha
} from '../../actions/User';

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			mobile: '',
			password: '',
			verifiedCode: '',
			captcha:'',
			checked:true,
			captchaUrl:api_sso_captcha+'?v='+Math.random(), //图形验证码api接口
			start:false,
			disabled:true,
		}
	}
	componentWillReceiveProps(nextProps){
		if(this.props.sms!=nextProps.sms){
			if(nextProps.sms.flag==0){
					this.setState({
						start:true,
						disabled:false
					});
			}else if(nextProps.sms.flag==5101){
				this.setState({captchaUrl:api_sso_captcha+'?v='+Math.random()})
			}
		}
		if (this.props.register !== nextProps.register) {
			// if (nextProps.register.flag == 0) {
				Alert('注册成功，请登录~');
				Actions.pop();
			// }
		}
		// if(this.props.userInfo!=nextProps.userInfo){
		// 		if(nextProps.userInfo && nextProps.userInfo.user_ticket){
		// 			Alert('注册成功');
		// 			// setTimeout(() => {
		// 			// 	this.props.fetchUserinfoDetailData();
		// 			// }, 500)
		// 			Actions.refresh('Home');
		// 			// Actions.pop();
		// 			// Actions.Home();
		// 		}
		// }
	}
	handleOnEnd(){
		this.setState({
			start:false
		});
	}
	pressRegBtn() {
		const {mobile,captcha,verifiedCode,password} = this.state;
		if(!mobile){
			Alert('请输入手机号码');
		}else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(mobile)){
			Alert('手机号码格式有误');
		}else if(!captcha){
			Alert('请输入验证码');
		}else if(!/^[A-z0-9]{4,6}$/.test(captcha)){
			Alert('请输入正确的图片验证码');
		}else if(!verifiedCode){
			Alert('请输入手机验证码');
		}else if(!password){
			Alert('请输入密码，包含6-20位字母或数字组成');
		}else if(password.length<6){
			Alert('密码不得少于6位');
		}else if(!/^[A-z0-9]{6,20}$/.test(password)){
			Alert('请输入密码包含6-20位的字母或数字组成');
		}else if(!this.state.checked){
			Alert('同意《用户协议》才能注册哦');
		}else{
			this.props.userRegister(mobile, password,verifiedCode);
		}
	}

	//获取手机验证码
	handleSendSMS(){
		const {mobile,captcha} = this.state;
		if(!mobile){
			Alert('请输入手机号码');
		}else if(!/^1[1|2|3|4|5|6|7|8|9][0-9]\d{8}$/i.test(mobile)){
			Alert('手机号码格式有误');
		}else if(!captcha){
			Alert('请输入验证码');
		}else if(!/^[A-z0-9]{4,6}$/.test(captcha)){
			Alert('请输入正确的图片验证码');
		}
		else{
			this.props.sendCaptcha(mobile,captcha);
		}
	}
	//监控手机号码输入
	OnMobileTextInputChanged(mobile){
		this.setState({mobile:mobile});
		if(mobile && mobile.length>11){
			this.setState({mobile:mobile.substr(0,11)});
		}
	}
	componentWillUnMount(){
		console.log('销毁');
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
								placeholder={"请输入您的手机号码"}
								clearButtonMode="while-editing"
								underlineColorAndroid={'transparent'}
								onChangeText={ (mobile) =>{
									 this.setState({mobile})
								   this.OnMobileTextInputChanged(mobile)}
								 }
								value={this.state.mobile}
								ref="mobileTextInput"
								maxLength={11}
								keyboardType = 'phone-pad'
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
							<TouchableHighlight style={[styles.btnWrapper,styles.captcha]} underlayColor={'rgba(255,255,255,0.4)'}  onPress={()=>this.setState({captchaUrl:api_sso_captcha+'?v='+Math.random()})} >
								<Image source={{uri:this.state.captchaUrl}} style={styles.captcha}/>
							</TouchableHighlight>
						</View>
						<View style={{backgroundColor:'#C9C9CB',height:0.5,marginLeft:20}}/>
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
							<CountDownTimer second={59} start={this.state.start} style={{marginRight:15}} textBtnStyle={{backgroundColor:this.state.mobile =='' ? '#D7D7D7' : '#0A93FF'}} onEnd={()=>this.handleOnEnd()} onSend={() => this.handleSendSMS()}/>
						</View>
						<View style={{backgroundColor:'#C9C9CB',height:0.5,marginLeft:20}}/>
						<View style={styles.inputWrapper}>
							<TextInput
								style={styles.input}
								placeholderTextColor={"#C9C9CB"}
								placeholder={"请输入密码"}
								clearButtonMode="while-editing"
								secureTextEntry={true}
								underlineColorAndroid={'transparent'}
								onChangeText={(password) => this.setState({password})}
								value={this.state.password}
							/>
						</View>
						<View style={{justifyContent:'flex-start',flexDirection:'row',width:global_width,backgroundColor: '#E5E5E5',height:40,paddingLeft:20,alignItems:'center'}}>
							<CheckBox
								label=''
								checked={this.state.checked}
								labelStyle={styles.labelStyle}
								checkboxStyle={styles.checkboxStyle}
								uncheckedImage={require('../../static/images/mainLogin/check2.png')}
								checkedImage={require('../../static/images/mainLogin/check3.png')}
								underlayColor="transparent"
								onChange={(checked) => this.setState({checked:!checked})}
							/>
							<View style={styles.agreement}>
								<Text style={styles.text}>我已阅读并同意</Text>
								<Text style={styles.text2} onPress={()=>Actions.UserAgreement()}>《用户协议》</Text>
							</View>
						</View>
						<View style={{justifyContent:'center',width:global_width,alignItems: 'center',height:45,backgroundColor: '#E5E5E5',}}>
							<TouchableHighlight underlayColor={'rgba(47,151,234,0.8)'} style={[styles.btnWrapper,this.state.disabled ? {backgroundColor:'#D7D7D7'} : {backgroundColor:'#0A93FF'}]} disabled={this.state.disabled} onPress={()=> this.pressRegBtn()}>
								<View>
									<Text style={{fontSize: 16, color: this.state.disabled ? '#FAFAFA' : '#fff'}}>注册</Text>
								</View>
							</TouchableHighlight>
						</View>
					</KeyboardAvoidingView>
				{this.props.loading ? <Loading /> : null}
			</View>
			</ScrollView>
		);
	}
}
const mapStateToProps = ({user,common}) => {
	return {
		userInfo:user.userInfo,
		sms:user.sms,
		loading:common.loading,
		register: user.register,
	}
}
export default connect(mapStateToProps, { verifiedCode,userRegister,sendCaptcha,fetchUserinfoDetailData})(Register);

const styles = StyleSheet.create({
	btnWrapper: {
		backgroundColor: '#fff',
		height: 45,
		width: global_width * 0.9,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3
	},
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
	captcha: {width:80,height:30,marginRight:5},
	agreement:{flexDirection: 'row',marginTop:-6,marginLeft:-14},
	text:{color:'#999'},
	text2:{color:'#0A93FF'}
})
