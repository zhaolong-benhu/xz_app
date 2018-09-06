/**
 * Created by zhaolong on 2017/11/06.
 * File description: 直播间课件
 */
import {
    LIVE_COURSEWARE_SUCCESS,
    LIVE_COURSEWARE_FAIL,
    LIVE_COURSEWARE
} from '../actions/types';

const INITIAL_STATE = {
    CoursewareDataloading:false,
	  error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LIVE_COURSEWARE_SUCCESS:
			return {
				...state,
        CoursewareDataloading:true,
				CoursewareData:action.result,
			};
		case LIVE_COURSEWARE_FAIL:
			return {
				...state,
				CoursewareData:action.error,
			};
		default:
			return state;
	}
};
