/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页人气导师
 */
import {
    HOME_TEACHER_SUCCESS,
    HOME_TEACHER_FAIL,
    HOME_TEACHER
} from '../actions/types';

const INITIAL_STATE = {
    teacherDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HOME_TEACHER_SUCCESS:
			return {
				...state,
                teacherDataloading:true,
				teacherData:action.result,
			};
		case HOME_TEACHER_FAIL:
			return {
				...state,
				teacherData:action.error,
			};
		default:
			return state;
	}
};
