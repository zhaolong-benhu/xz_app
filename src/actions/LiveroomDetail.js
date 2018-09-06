/**
 * Created by zhaolong on 2017/04/19.
 * File description: 直播间详情
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	LIVEROOMDETAIL_SUCCESS,
    LIVEROOMDETAIL_FAIL,
    LIVEROOMDETAIL,
	LOADING_START,
	LOADING_END
} from './types';

const liveroomDetail = (type,result) => {
	switch (type) {
		case LIVEROOMDETAIL_SUCCESS:
			return {
					type: LIVEROOMDETAIL_SUCCESS,
					result:result
			}
			break;
		case LIVEROOMDETAIL_FAIL:
			return {
					type: LIVEROOMDETAIL_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchLiveroomDetail(id){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_liveRoomDetail,{'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(liveroomDetail(LIVEROOMDETAIL_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
