/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页免费好课
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	HOME_TEACHER_SUCCESS,
	HOME_TEACHER_FAIL,
	HOME_TEACHER,
} from './types';

const teacher = (type,result) => {
	switch (type) {
		case HOME_TEACHER_SUCCESS:
			return {
					type: HOME_TEACHER_SUCCESS,
					result:result
			}
			break;
		case HOME_TEACHER_FAIL:
			return {
					type: HOME_TEACHER_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchTeacherData(){
	return (dispatch) => {
			helpers.getFetchFromCache(api.api_teacher).then((result)=>{
					dispatch(teacher(result ? HOME_TEACHER_SUCCESS : HOME_TEACHER_FAIL,result))
			})
	}
}
