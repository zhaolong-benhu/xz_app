/**
 * Created by zhaolong on 2017/11/07.
 * File description: 直播间-历史回看
 */
import {
    LIVE_HISTORICALREVIEW_SUCCESS,
    LIVE_HISTORICALREVIEW_FAIL,
    LIVE_HISTORICALREVIEW,
} from '../actions/types';

const INITIAL_STATE = {
    historyreviewDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LIVE_HISTORICALREVIEW_SUCCESS:
			return {
				...state,
                historyreviewDataloading:true,
				historyreviewData:action.result,
			};
		case LIVE_HISTORICALREVIEW_FAIL:
			return {
				...state,
				historyreviewData:action.error,
			};
		default:
			return state;
	}
};
