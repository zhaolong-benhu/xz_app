/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页免费好课
 */
import {
    HOME_FREECOURSE_SUCCESS,
    HOME_FREECOURSE_FAIL,
    HOME_FREECOURSE
} from '../actions/types';

const INITIAL_STATE = {
    freeCourseDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HOME_FREECOURSE_SUCCESS:
			return {
				...state,
                freeCourseDataloading:true,
				freeCourseData:action.result,
			};
		case HOME_FREECOURSE_FAIL:
			return {
				...state,
				freeCourseData:action.error,
			};
		default:
			return state;
	}
};
