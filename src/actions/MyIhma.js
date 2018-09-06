/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-我的IHMA
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	STUDY_MYIHMA_SUCCESS,
	STUDY_MYIHMA_FAIL,
	STUDY_MYIHMA,
	LOADING_START,
	LOADING_END,
  COURSE_LIST_REFRESH_FALSE,
} from './types';

const myIhma = (type,result) => {
	switch (type) {
		case STUDY_MYIHMA_SUCCESS:
			return {
					type: STUDY_MYIHMA_SUCCESS,
					result:result
			}
			break;
		case STUDY_MYIHMA_FAIL:
			return {
					type: STUDY_MYIHMA_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchmyIhmaData(){
	return (dispatch) => {
			helpers.post(api.api_myihma).then(
				result => {
          dispatch({type:COURSE_LIST_REFRESH_FALSE,})
					result ? dispatch(myIhma(STUDY_MYIHMA_SUCCESS,result)) : null},
			)
	}
}
