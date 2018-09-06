/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页免费好课
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	HOME_FREECOURSE_SUCCESS,
	HOME_FREECOURSE_FAIL,
	HOME_FREECOURSE,
} from './types';

const free = (type,result) => {
	switch (type) {
		case HOME_FREECOURSE_SUCCESS:
			return {
					type: HOME_FREECOURSE_SUCCESS,
					result:result
			}
			break;
		case HOME_FREECOURSE_FAIL:
			return {
					type: HOME_FREECOURSE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchFreeCourseData(){
	return (dispatch) => {
			helpers.getFetchFromCache(api.api_freecouse).then((result)=>{
					dispatch(free(result ? HOME_FREECOURSE_SUCCESS : HOME_FREECOURSE_FAIL,result))
			})
	}
}
