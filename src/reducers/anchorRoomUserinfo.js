/**
 * Created by zhaolong on 2017/11/06.
 * File description: 直播间-主播信息
 */
import {
    LIVE_USERINFO_SUCCESS,
    LIVE_USERINFO_FAIL,
    LIVE_USERINFO
} from '../actions/types';

const INITIAL_STATE = {
    liveUserinfoDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LIVE_USERINFO_SUCCESS:
			return {
				...state,
                liveUserinfoDataloading:true,
			    liveUserinfoData:action.result,
			};
		case LIVE_USERINFO_FAIL:
			return {
				...state,
				liveUserinfoData:action.error,
			};
		default:
			return state;
	}
};
