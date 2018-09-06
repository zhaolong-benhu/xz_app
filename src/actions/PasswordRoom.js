/**
 * Created by zhaolong on 2017/04/19.
 * File description: 直播间-验证规则
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	LIVE_ROOMVALID_SUCCESS,
    LIVE_ROOMVALID_FAIL,
    LIVE_ROOMVALID,
	LIVE_ROOMHISTORYVALID_SUCCESS,
    LIVE_ROOMHISTORYVALID_FAIL,
    LIVE_ROOMHISTORYVALID,
	LIVE_ROOMVALIDPASSWORD_SUCCESS,
	LIVE_ROOMVALIDPASSWORD_FAIL,
	LIVE_ROOMVALIDPASSWORD,
	LOADING_START,
	LOADING_END
} from './types';

const liveroomValid = (type,result) => {
	switch (type) {
		case LIVE_ROOMVALID_SUCCESS:
			return {
					type: LIVE_ROOMVALID_SUCCESS,
					result:result
			}
			break;
		case LIVE_ROOMVALID_FAIL:
			return {
					type: LIVE_ROOMVALID_FAIL,
					error:result
			}
			break;
		case LIVE_ROOMHISTORYVALID_SUCCESS:
			return {
					type: LIVE_ROOMHISTORYVALID_SUCCESS,
					result:result
			}
			break;
		case LIVE_ROOMHISTORYVALID_FAIL:
			return {
					type: LIVE_ROOMHISTORYVALID_FAIL,
					error:result
			}
			break;
		case LIVE_ROOMVALIDPASSWORD_SUCCESS:
			return {
					type: LIVE_ROOMVALIDPASSWORD_SUCCESS,
					result:result
			}
			break;
		case LIVE_ROOMVALIDPASSWORD_FAIL:
			return {
					type: LIVE_ROOMVALIDPASSWORD_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchLiveroomValid(id){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_liveroomValid,{'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(liveroomValid(LIVE_ROOMVALID_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
export function fetchLiveroomValidforHistory(id){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_liveroomValid,{'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(liveroomValid(LIVE_ROOMHISTORYVALID_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
export function fetchLiveroomValidpassword(id,pwd){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_liveroomValidpassword,{'id':id,'password':pwd}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(liveroomValid(LIVE_ROOMVALIDPASSWORD_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
