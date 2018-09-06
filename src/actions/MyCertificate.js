/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-我的专业证书
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	STUDY_CERTIFICATE_SUCCESS,
	STUDY_CERTIFICATE_FAIL,
	STUDY_CERTIFICATE,
	LOADING_START,
	LOADING_END,
  COURSE_LIST_REFRESH_FALSE,
} from './types';

const myCertificate = (type,result) => {
	switch (type) {
		case STUDY_CERTIFICATE_SUCCESS:
			return {
					type: STUDY_CERTIFICATE_SUCCESS,
					result:result
			}
			break;
		case STUDY_CERTIFICATE_FAIL:
			return {
					type: STUDY_CERTIFICATE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchmyCertificateData(page){
	return (dispatch) => {
			helpers.post(api.api_mycertificate).then(
				result => {
          dispatch({type:COURSE_LIST_REFRESH_FALSE,})
					result ? dispatch(myCertificate(STUDY_CERTIFICATE_SUCCESS,result)) : null},
			)
	}
}
