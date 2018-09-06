/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页免费好课
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	HOME_CERTIFICATE_SUCCESS,
	HOME_CERTIFICATE_FAIL,
	HOME_CERTIFICATE,
} from './types';

const certificate = (type,result) => {
	switch (type) {
		case HOME_CERTIFICATE_SUCCESS:
			return {
					type: HOME_CERTIFICATE_SUCCESS,
					result:result,
			}
			break;
		case HOME_CERTIFICATE_FAIL:
			return {
					type: HOME_CERTIFICATE_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchOccupationCertificateData(){
	return (dispatch) => {
			helpers.getFetchFromCache(api.api_cert).then((result)=>{
					dispatch(certificate(result ? HOME_CERTIFICATE_SUCCESS : HOME_CERTIFICATE_FAIL,result))
			})
	}
}
