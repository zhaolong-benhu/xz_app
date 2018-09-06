/**
 * Created by zhaolong on 2017/04/28.
 * File description: 个人中心-用户详细信息
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	USER_USERINFO_SUCCESS,
	USER_USERINFO_FAIL,
	USER_USERINFO,

	USER_UPLOADAVATAR_SUCCESS,
	USER_UPLOADAVATAR_FAIL,
	USER_UPLOADAVATAR,

	USER_MODIFYNICKNAME_SUCCESS,
	USER_MODIFYNICKNAME_FAIL,
	USER_MODIFYNICKNAME,

	USER_FEEDBACK_SUCCESS,
	USER_FEEDBACK_FAIL,
	USER_FEEDBACK,

	LOADING_START,
	LOADING_END,

	UPUDAE_USER_AVATAR,
	UPUDAE_USER_NAME,
} from './types';
import {Actions} from 'react-native-router-flux';
const userInfo = (type,result) => {
	return{
		type:type,
		result:result
	}
}

//请求用户详细数据
// export function fetchUserinfoDetailData(){
// 	return (dispatch) => {
// 			helpers.post(api.api_userInfoDetail).then((result)=>{
//
// 					dispatch(userInfo(USER_USERINFO_SUCCESS,result))
// 			})
// 	}
// }

export function	fetchUserinfoDetailData(){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_userInfoDetail)
				.then(
						result => {
								dispatch(result ? userInfo(USER_USERINFO_SUCCESS,result) : {type:LOADING_END});
				 		},
						err => {dispatch({type:LOADING_END})}
				)
	}
}
//更新用户头像
const updateUserAvatar = avatar => ({
	type: UPUDAE_USER_AVATAR,
	payload: avatar,
})

//更新用户昵称
const updateUserName = name => ({
	type: UPUDAE_USER_NAME,
	payload: name,
})
//上传用户头像
export function fetchUploadAvatar(avatar){
	return (dispatch) => {
			helpers.post(api.api_updateavatar,{'avatar':avatar})
			.then(
					result => {dispatch(result ? updateUserAvatar(result.pic)  : {})
				},
			)
	}
}

//修改用户昵称
export function fetchModifyNickName(user){
	return (dispatch) => {
			helpers.post(api.api_modifyNickname,{'user_detail':user})
			.then(
					result => {dispatch(result ? userInfo(USER_MODIFYNICKNAME_SUCCESS,user.name) : {})
				}
			)
	}
}

//用户反馈
export function fetchFeedback(content,pic){
	return (dispatch) => {
			helpers.post(api.api_feedback,{'content':content,'pic':pic})
			.then(
					result => {dispatch(result ? userInfo(USER_FEEDBACK_SUCCESS,result) : {})},
			)
	}
}
