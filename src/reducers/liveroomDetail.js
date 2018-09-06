/**
 * Created by zhaolong on 2017/11/06.
 * File description: 直播间-详情
 */
import {
    LIVEROOMDETAIL_SUCCESS,
    LIVEROOMDETAIL_FAIL,
    LIVEROOMDETAIL
} from '../actions/types';

const INITIAL_STATE = {
    liveroomDetailDataloading:false,
	error:'',
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LIVEROOMDETAIL_SUCCESS:
			return {
				...state,
                liveroomDetailDataloading:true,
			    liveroomDetailData:action.result,
			};
		case LIVEROOMDETAIL_FAIL:
			return {
				...state,
				liveroomDetailData:action.error,
			};
		default:
			return state;
	}
};
