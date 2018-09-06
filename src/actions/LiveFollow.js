/**
 * Created by zhaolong on 2017/04/19.
 * File description: 个人中心-直播关注
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	LIVE_FOLLOWING_SUCCESS,
  LIVE_FOLLOWING_FAIL,
  LIVE_FOLLOWING,
	LIVE_ADDCANCELFOLLOW_SUCCESS,
	LIVE_ADDCANCELFOLLOW_FAIL,
	LIVE_ADDCANCELFOLLOW,
	LOADING_START,
	LOADING_END
} from './types';

const live_follow = (type,result) => {
	switch (type) {
		case LIVE_FOLLOWING_SUCCESS:
			return {
					type: LIVE_FOLLOWING_SUCCESS,
					result:result
			}
			break;
		case LIVE_FOLLOWING_FAIL:
			return {
					type: LIVE_FOLLOWING_FAIL,
					error:result
			}
			case LIVE_ADDCANCELFOLLOW_SUCCESS:
				return {
						type: LIVE_ADDCANCELFOLLOW_SUCCESS,
						result:result
				}
				break;
			case LIVE_ADDCANCELFOLLOW_FAIL:
				return {
						type: LIVE_ADDCANCELFOLLOW_FAIL,
						error:result
				}
			break;
		default:
	}
}

//获取关注列表
export function fetchliveFollowData(page){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_livelist,{'page_size':10,'page':page}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(live_follow(LIVE_FOLLOWING_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}

//加关注 取消关注
export function addLiveFavorite(id){
	return (dispatch) => {
			// dispatch({type:LOADING_START})
			helpers.post(api.api_changeliveFavorite,{'type':24,'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(live_follow(LIVE_ADDCANCELFOLLOW_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
