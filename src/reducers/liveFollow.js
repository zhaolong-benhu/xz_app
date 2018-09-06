/**
 * Created by zhaolong on 2017/04/27.
 * File description: 个人中心-关注主播
 */
import {
    LIVE_FOLLOWING_SUCCESS,
    LIVE_FOLLOWING_FAIL,
    LIVE_ADDCANCELFOLLOW_SUCCESS,
    LIVE_ADDCANCELFOLLOW_FAIL,
    LIVE_FOLLOWING,
    LIVE_ADDCANCELFOLLOW
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LIVE_FOLLOWING_SUCCESS:
			return {
				...state,
				followingData:action.result,
			};
		case LIVE_FOLLOWING_FAIL:
			return {
				...state,
				followingData:action.error,
			};
    case LIVE_ADDCANCELFOLLOW_SUCCESS:
        return {
          ...state,
          addcancelfollowData:action.result,
        };
    case LIVE_ADDCANCELFOLLOW_FAIL:
        return {
          ...state,
          addcancelfollowData:action.error,
        };
		default:
			return state;
	}
};
