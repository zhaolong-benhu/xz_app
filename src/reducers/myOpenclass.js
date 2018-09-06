/**
 * Created by zhaolong on 2017/04/19.
 * File description: 个人中心-我的公开课
 */
import {
    STUDY_MYOPENCLASS_SUCCESS,
    STUDY_MYOPENCLASS_FAIL,
    STUDY_MYOPENCLASS
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STUDY_MYOPENCLASS_SUCCESS:
			return {
				...state,
				myOpenclassData:action.result,
			};
		case STUDY_MYOPENCLASS_FAIL:
			return {
				...state,
				myOpenclassData:action.error,
			};
		default:
			return state;
	}
};
