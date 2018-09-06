/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-我的精品课
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	STUDY_MYCOURSE_SUCCESS,
	STUDY_MYCOURSE_FAIL,
	STUDY_MYCOURSE,
	LOADING_START,
	LOADING_END,
  COURSE_LIST_REFRESH_FALSE
} from './types';

const myCourse = (type,result) => {
	switch (type) {
		case STUDY_MYCOURSE_SUCCESS:
			return {
					type: STUDY_MYCOURSE_SUCCESS,
					result:result
			}
			break;
		case STUDY_MYCOURSE_FAIL:
			return {
					type: STUDY_MYCOURSE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchmyCourseData(page){
	return (dispatch) => {
			helpers.post(api.api_mycourse,{'page':page}).then(
				result => {
          dispatch({type:COURSE_LIST_REFRESH_FALSE,})
					result ? dispatch(myCourse(STUDY_MYCOURSE_SUCCESS,result)) : null },
			)
	}
}
