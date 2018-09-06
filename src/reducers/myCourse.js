/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-我的精品课
 */
import {
    STUDY_MYCOURSE_SUCCESS,
    STUDY_MYCOURSE_FAIL,
    STUDY_MYCOURSE
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STUDY_MYCOURSE_SUCCESS:
			return {
				...state,
				myCourseData:action.result,
			};
		case STUDY_MYCOURSE_FAIL:
			return {
				...state,
				myCourseData:action.error,
			};
		default:
			return state;
	}
};
