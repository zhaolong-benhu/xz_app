/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页免费好课
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	HOME_OPENCOURSE_SUCCESS,
	HOME_OPENCOURSE_FAIL,
	HOME_OPENCOURSE,
} from './types';

const open = (type,result) => {
	switch (type) {
		case HOME_OPENCOURSE_SUCCESS:
			return {
					type: HOME_OPENCOURSE_SUCCESS,
					result:result
			}
			break;
		case HOME_OPENCOURSE_FAIL:
			return {
					type: HOME_OPENCOURSE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchOpenCourseData(){
	return (dispatch) => {
			helpers.getFetchFromCache(api.api_opencourse).then((result)=>{
					dispatch(open(result ? HOME_OPENCOURSE_SUCCESS : HOME_OPENCOURSE_FAIL,result))
			})
	}
}
