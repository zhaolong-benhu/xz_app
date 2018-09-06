/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页搜索
 */
import {
    HOME_SEARCH_SUCCESS,
    HOME_SEARCH_FAIL,
    HOME_SEARCH
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case HOME_SEARCH_SUCCESS:
			return {
				...state,
				searchResult:action.result,
			};
		case HOME_SEARCH_FAIL:
			return {
				...state,
				searchResult:action.error,
			};
		default:
			return state;
	}
};
