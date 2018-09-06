/**
 * Created by zhaolong on 2017/04/19.
 * File description: 直播间-主播信息
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	LIVE_USERINFO_SUCCESS,
    LIVE_USERINFO_FAIL,
    LIVE_USERINFO,
	LOADING_START,
	LOADING_END
} from './types';

const live_userinfo = (type,result) => {
	switch (type) {
		case LIVE_USERINFO_SUCCESS:
			return {
					type: LIVE_USERINFO_SUCCESS,
					result:result
			}
			break;
		case LIVE_USERINFO_FAIL:
			return {
					type: LIVE_USERINFO_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchLiveroomUserinfo(id){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_liveUserinfo,{'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(live_userinfo(LIVE_USERINFO_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
