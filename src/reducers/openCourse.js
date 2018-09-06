/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页线下公开课
 */
import {
    HOME_OPENCOURSE_SUCCESS,
    HOME_OPENCOURSE_FAIL,
    HOME_OPENCOURSE
} from '../actions/types';

const INITIAL_STATE = {
    openCourseDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HOME_OPENCOURSE_SUCCESS:
			return {
				...state,
                openourseDataloading:true,
				openCourseData:action.result,
			};
		case HOME_OPENCOURSE_FAIL:
			return {
				...state,
				openCourseData:action.error,
			};
		default:
			return state;
	}
};
