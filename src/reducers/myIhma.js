/**
 * Created by zhaolong on 2017/04/19.
 * File description: 书包-我的IHMA
 */
import {
    STUDY_MYIHMA_SUCCESS,
    STUDY_MYIHMA_FAIL,
    STUDY_MYIHMA
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STUDY_MYIHMA_SUCCESS:
			return {
				...state,
				myIhmaData:action.result,
			};
		case STUDY_MYIHMA_FAIL:
			return {
				...state,
				myIhmaData:action.error,
			};
		default:
			return state;
	}
};
