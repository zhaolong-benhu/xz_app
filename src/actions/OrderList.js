/**
 * Created by zhaolong on 2017/04/27.
 * File description: 个人中心-订单列表
 */
import * as helpers from '../helpers/helpers';
import * as api from '../api/global'
import {
	USER_ORDERLIST_SUCCESS,
	USER_ORDERLIST_FAIL,
	USER_ORDERLIST,
	LOADING_START,
	LOADING_END
} from './types';

const orderList = (type,result) => {
	switch (type) {
		case USER_ORDERLIST_SUCCESS:
			return {
					type: USER_ORDERLIST_SUCCESS,
					result:result
			}
			break;
		case USER_ORDERLIST_FAIL:
			return {
					type: USER_ORDERLIST_FAIL,
					error:result
			}
			break;
		default:
	}
}

export function fetchOrderListData(page,page_size){
	return (dispatch) => {
			dispatch({type:LOADING_START})
			helpers.post(api.api_order_list,{'page':page,'page_size':page_size}).then(
				result => {result ? dispatch(orderList(USER_ORDERLIST_SUCCESS,result)) : dispatch({type:LOADING_END})},
				err => {dispatch({type:LOADING_END})}
			)
	}
}
