/**
 * Created by zhaolong on 2017/11/08.
 * File description: 直播间-历史回看详情
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	LIVE_VIDEODETAIL_SUCCESS,
    LIVE_VIDEODETAIL_FAIL,
    LIVE_VIDEODETAIL,
	LOADING_START,
	LOADING_END
} from './types';

const live_videodetail = (type,result) => {
	switch (type) {
		case LIVE_VIDEODETAIL_SUCCESS:
			return {
					type: LIVE_VIDEODETAIL_SUCCESS,
					result:result
			}
			break;
		case LIVE_CVIDEODETAIL_FAIL:
			return {
					type: LIVE_VIDEODETAIL_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchVideodetailData(id){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_videodetail,{'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(live_videodetail(LIVE_VIDEODETAIL_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
