/**
 * Created by zhaolong on 2017/06/20.
 * File description: 书包-我的活动
 */
import {
    STUDY_MYACTIVITY_SUCCESS,
    STUDY_MYACTIVITY_FAIL,
    STUDY_MYACTIVITY
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STUDY_MYACTIVITY_SUCCESS:
			return {
				...state,
				myActivityData:action.result,
			};
		case STUDY_MYACTIVITY_FAIL:
			return {
				...state,
				myActivityData:action.error,
			};
		default:
			return state;
	}
};
