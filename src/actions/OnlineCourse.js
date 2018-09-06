/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页Banner
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	HOME_ONLINECOURSE_SUCCESS,
	HOME_ONLINECOURSE_FAIL,
	HOME_ONLINECOURSE,
} from './types';

const online = (type,result) => {
	switch (type) {
		case HOME_ONLINECOURSE_SUCCESS:
			return {
					type: HOME_ONLINECOURSE_SUCCESS,
					result:result
			}
			break;
		case HOME_ONLINECOURSE_FAIL:
			return {
					type: HOME_ONLINECOURSE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchOnlineCourseData(){
	return (dispatch) => {
			helpers.getFetchFromCache(api.api_course).then((result)=>{
					dispatch(online(result ? HOME_ONLINECOURSE_SUCCESS : HOME_ONLINECOURSE_FAIL,result))
			})
	}
}
