/**
 * Created by zhaolong on 2017/04/19.
 * File description: 个人中心-直播关注
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	LIVE_COURSEWARE_SUCCESS,
    LIVE_COURSEWARE_FAIL,
    LIVE_COURSEWARE,
	LOADING_START,
	LOADING_END
} from './types';

const live_courseware_list = (type,result) => {
	switch (type) {
		case LIVE_COURSEWARE_SUCCESS:
			return {
					type: LIVE_COURSEWARE_SUCCESS,
					result:result
			}
			break;
		case LIVE_COURSEWARE_FAIL:
			return {
					type: LIVE_COURSEWARE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchCoursewareData(id){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_coursewarelist,{'id':id}).then(
				result => {dispatch({type:LOADING_END}); result ? dispatch(live_courseware_list(LIVE_COURSEWARE_SUCCESS,result)) : null},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
