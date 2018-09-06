/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-删除课程
 */
import {
    STUDY_DELETECOURSE_SUCCESS,
    STUDY_DELETECOURSE_FAIL,
    STUDY_DELETECOURSE
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STUDY_DELETECOURSE_SUCCESS:
			return {
				...state,
				delCourseData:action.result,
			};
		case STUDY_DELETECOURSE_FAIL:
			return {
				...state,
				delCourseData:action.error,
			};
		default:
			return state;
	}
};
