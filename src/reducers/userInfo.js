/**
 * Created by zhaolong on 2017/04/19.
 * File description: 首页线下公开课
 */
import {
    USER_USERINFO_SUCCESS,
    USER_USERINFO_FAIL,
    USER_USERINFO,

    USER_UPLOADAVATAR_SUCCESS,
    USER_UPLOADAVATAR_FAIL,
    USER_UPLOADAVATAR,

    USER_MODIFYNICKNAME_SUCCESS,
    USER_MODIFYNICKNAME_FAIL,
    USER_MODIFYNICKNAME,

    USER_FEEDBACK_SUCCESS,
    USER_FEEDBACK_FAIL,
    USER_FEEDBACK,

    UPUDAE_USER_AVATAR,
    UPUDAE_USER_NAME,
} from '../actions/types';
import { fromJS, toJS } from 'immutable';
const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_USERINFO_SUCCESS:
			return {
				...state,
				userInfoDetail:action.result,
			};
		case USER_USERINFO_FAIL:
			return {
				...state,
				userInfoDetail:action.error,
			};
        case USER_UPLOADAVATAR_SUCCESS:
            return {
                ...state,
                uploadAvatar:action.result,
            };
        case USER_UPLOADAVATAR_FAIL:
            return {
                ...state,
                uploadAvatar:action.error,
            };
        case USER_MODIFYNICKNAME_SUCCESS:
            state = fromJS(state)
            return state.setIn(['userInfoDetail', 'user_name'], action.result).toJS();
        case USER_MODIFYNICKNAME_FAIL:
            return {
                ...state,
                midifyNickname:action.error,
            };
        case USER_FEEDBACK_SUCCESS:
            return {
                ...state,
                feedback:action.result,
            };
        case USER_FEEDBACK_FAIL:
            return {
                ...state,
                feedback:action.error,
            };
        case UPUDAE_USER_AVATAR:
            state = fromJS(state)
            return state.setIn(['userInfoDetail', 'thumb'], action.payload).toJS();
		default:
			return state;
	}
};
