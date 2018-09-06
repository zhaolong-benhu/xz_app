/**
 * Created by zhaolong on 2017/11/07.
 * File description: 直播间-历史回看
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	LIVE_HISTORICALREVIEW_SUCCESS,
    LIVE_HISTORICALREVIEW_FAIL,
    LIVE_HISTORICALREVIEW,
	LOADING_START,
	LOADING_END
} from './types';

const live_historyreview_list = (type,result) => {
	switch (type) {
		case LIVE_HISTORICALREVIEW_SUCCESS:
			return {
					type: LIVE_HISTORICALREVIEW_SUCCESS,
					result:result
			}
			break;
		case LIVE_HISTORICALREVIEW_FAIL:
			return {
					type: LIVE_HISTORICALREVIEW_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchHistoricalReviewData(id){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_historyreviewlist,{'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(live_historyreview_list(LIVE_HISTORICALREVIEW_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
