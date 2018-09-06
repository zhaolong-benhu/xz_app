/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页IHMA证书
 */
import {
    HOME_CERTIFICATE_SUCCESS,
    HOME_CERTIFICATE_FAIL,
    HOME_CERTIFICATE
} from '../actions/types';

const INITIAL_STATE = {
    certificateDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HOME_CERTIFICATE_SUCCESS:
			return {
				...state,
                certificateDataloading:true,
				certificateData:action.result,
			};
		case HOME_CERTIFICATE_FAIL:
			return {
				...state,
				certificateData:action.error,
			};
		default:
			return state;
	}
};
