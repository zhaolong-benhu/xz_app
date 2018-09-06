/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页在线课程
 */
import {
    HOME_ONLINECOURSE_SUCCESS,
    HOME_ONLINECOURSE_FAIL,
    HOME_ONLINECOURSE
} from '../actions/types';

const INITIAL_STATE = {
    onLineCourseDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HOME_ONLINECOURSE_SUCCESS:
			return {
				...state,
                onLineCourseDataloading:true,
				onLineCourseData:action.result,
			};
		case HOME_ONLINECOURSE_FAIL:
			return {
				...state,
				onLineCourseData:action.error,
			};
		default:
			return state;
	}
};
