/**
 * Created by zhaolong on 2017/06/20.
 * File description: 书包-我的活动
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	STUDY_MYACTIVITY_SUCCESS,
	STUDY_MYACTIVITY_FAIL,
	STUDY_MYACTIVITY,
	LOADING_START,
	LOADING_END,
    COURSE_LIST_REFRESH_FALSE,
} from './types';

const myActivity = (type,result) => {
	switch (type) {
		case STUDY_MYACTIVITY_SUCCESS:
			return {
					type: STUDY_MYACTIVITY_SUCCESS,
					result:result
			}
			break;
		case STUDY_MYACTIVITY_FAIL:
			return {
					type: STUDY_MYACTIVITY_FAIL,
					error:result
			}
			break;
		default:
	}
}
//请求接口数据并返回
export function fetchmyActivityData(){
	return (dispatch) => {
			helpers.post(api.api_myactivity).then(
				result => {
          dispatch({type:COURSE_LIST_REFRESH_FALSE,})
					result ? dispatch(myActivity(STUDY_MYACTIVITY_SUCCESS,result)) : null},
                )
            }
	}
