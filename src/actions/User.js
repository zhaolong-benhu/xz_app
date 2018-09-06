/**
 * Created by same on 11/04/2017.
 * File description:
 */
import * as helpers from '../helpers/helpers';
import {
	USER_INFO_SUCCESS,
	USER_REGISTER_SUCCESS,
	MOBILE_CODE_SUCCESS,
	MOBILE_SEND_SUCCESS,
	USER_FORGOTPASSWORD_SUCCESS,
	USER_USERINFO_SUCCESS,
	LOADING_START,
	LOADING_END,
} from './types';

const userInfo = (type,result) => {
	return {
			type: type,
			result:result
	}
}
//用户登陆
export function	userLogin(username, password){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.userAuth('authorization/client/login',{username:username,password:password})
				.then(
						result => {dispatch({type:LOADING_END}); result ? dispatch(userInfo(USER_INFO_SUCCESS,result)) : null},
						err => {dispatch({type:LOADING_END})}
				)
	}
}
//用户退出
export function	logout(){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.userLogout('authorization/client/logout')
				.then(
						result => {dispatch({type:LOADING_END}); result ? dispatch(userInfo(USER_INFO_SUCCESS,null),dispatch(userInfo(USER_USERINFO_SUCCESS,null))) : null},
						err => {dispatch({type:LOADING_END})}
				)
	}
}
//获取用户信息
export function	getUserInfo(){
	return (dispatch) => {
			helpers.getUserInfo().then(
					result => {dispatch({type:LOADING_END}); result ? dispatch(userInfo(USER_INFO_SUCCESS,result)) : null},
					err => {dispatch({type:LOADING_END})}
			)
	}
}
//用户注册(手机号码注册接口)
export function	userRegister(mobile,password,code){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.register('authorization/client/register',{username:mobile,mobile:mobile,password:password,code:code,type:1})
				.then(
						result => {
							dispatch({type:LOADING_END}); result ? dispatch(userInfo(USER_REGISTER_SUCCESS,result)) : null
						},
						err => {dispatch({type:LOADING_END})}
				)
	}
}

//验证短信
export function	verifiedCode(mobile,code){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post('http://sso.9first.com/user/code_verify',{mobile:mobile,code:code,sms_type:6,return_type:'json'})
				.then(
						result => {dispatch({type:LOADING_END}); result ? dispatch(userInfo(MOBILE_CODE_SUCCESS,result)) : null},
						err => {dispatch({type:LOADING_END})}
				)
	}
}

//发送短信
export function sendCaptcha(mobile,captcha,sms_type=6){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.getFetchNeverCached('http://sso.9first.com/user/mobile_code',{appid:2,mobile:mobile,captcha:captcha,sms_type:sms_type,return_type:'json'})
				.then(
						result => {dispatch({type:LOADING_END}); result ? dispatch(userInfo(MOBILE_SEND_SUCCESS,result)) : null},
						err => {dispatch({type:LOADING_END})}
				)
	}
}
//手机找回密码
export function	getPassword(mobile,code,password){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.getFetchNeverCached('http://sso.9first.com/user/forget_password',{code:code,value:mobile,password:password,appid:2,method: 'mobile',field:'mobile',return_type:'json'})
				.then(
						result => {dispatch({type:LOADING_END}); result ? dispatch(userInfo(USER_FORGOTPASSWORD_SUCCESS,result)) : null},
						err => {dispatch({type:LOADING_END})}
				)
	}
}

//修改密码
export function resetPassWord(oldPassword,newPassword){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post('/authorization/client/resetpassword',{oldPassword:oldPassword,newPassword:newPassword})
				.then(
						result => {dispatch({type:LOADING_END}); result ? dispatch(userInfo(USER_INFO_SUCCESS,null),dispatch(userInfo(USER_USERINFO_SUCCESS,null))) : null},
						err => {dispatch({type:LOADING_END})}
				)
	}
}
