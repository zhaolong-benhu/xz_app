/**
 * Created by zhaolong on 2017/11/06.
 * File description: 直播间-历史回看详情
 */
import {
    LIVE_VIDEODETAIL_SUCCESS,
    LIVE_VIDEODETAIL_FAIL,
    LIVE_VIDEODETAIL
} from '../actions/types';

const INITIAL_STATE = {
    videodetailDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LIVE_VIDEODETAIL_SUCCESS:
			return {
				...state,
                videodetailDataloading:true,
				videodetailData:action.result,
			};
		case LIVE_VIDEODETAIL_FAIL:
			return {
				...state,
				videodetailData:action.error,
			};
		default:
			return state;
	}
};
