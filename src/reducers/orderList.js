/**
 * Created by zhaolong on 2017/04/27.
 * File description: 个人中心-订单列表
 */
import {
    USER_ORDERLIST_SUCCESS,
    USER_ORDERLIST_FAIL,
    USER_ORDERLIST
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_ORDERLIST_SUCCESS:
			return {
				...state,
			    orderListData:action.result,
			};
		case USER_ORDERLIST_FAIL:
			return {
				...state,
				orderListData:action.error,
			};
		default:
			return state;
	}
};
