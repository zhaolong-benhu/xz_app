/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-我的专业证书
 */
import {
    STUDY_CERTIFICATE_SUCCESS,
    STUDY_CERTIFICATE_FAIL,
    STUDY_CERTIFICATE
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STUDY_CERTIFICATE_SUCCESS:
			return {
				...state,
				myCertificateData:action.result,
			};
		case STUDY_CERTIFICATE_FAIL:
			return {
				...state,
				myCertificateData:action.error,
			};
		default:
			return state;
	}
};
