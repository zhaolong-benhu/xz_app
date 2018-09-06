/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-我的公开课
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	STUDY_MYOPENCLASS_SUCCESS,
	STUDY_MYOPENCLASS_FAIL,
	STUDY_MYOPENCLASS,
	LOADING_START,
	LOADING_END
} from './types';

const myOpenclass = (type,result) => {
	switch (type) {
		case STUDY_MYOPENCLASS_SUCCESS:
			return {
					type: STUDY_MYOPENCLASS_SUCCESS,
					result:result
			}
			break;
		case STUDY_MYOPENCLASS_FAIL:
			return {
					type: STUDY_MYOPENCLASS_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchmyOpenclassData(page){
	return (dispatch) => {
			helpers.post(api.api_myopenclass,{'page':page}).then(
				result => {
					result ? dispatch(myOpenclass(STUDY_MYOPENCLASS_SUCCESS,result)) : null},
			)
	}
}
