/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-右滑删除课程
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	STUDY_DELETECOURSE_SUCCESS,
	STUDY_DELETECOURSE_FAIL,
	STUDY_DELETECOURSE
} from './types';

const deleteCourse = (type,result) => {
	switch (type) {
		case STUDY_DELETECOURSE_SUCCESS:
			return {
					type: STUDY_DELETECOURSE_SUCCESS,
					result:result
			}
			break;
		case STUDY_DELETECOURSE_FAIL:
			return {
					type: STUDY_DELETECOURSE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function deleteCourseData(type,course_id){
	return (dispatch) => {
			helpers.post(api.api_deletecourse,{'type':type,'course_id':course_id}).then(
				result => { dispatch(deleteCourse(STUDY_DELETECOURSE_SUCCESS,result))}
			)
	}
}
