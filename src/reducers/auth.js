/**
 * Created by qzy on 11/04/2017.
 * File description:
 */
import {
	USER_INFO_SUCCESS,MOBILE_SEND_SUCCESS,USER_FORGOTPASSWORD_SUCCESS,USER_USERINFO_SUCCESS,USER_USERINFO_FAIL,UPUDAE_USER_AVATAR,USER_REGISTER_SUCCESS
} from '../actions/types';
import { fromJS, toJS } from 'immutable';
const INITIAL_STATE = {
		userInfo:{
      user_ticket: "",
      user_id: "",
      user_name: "",
      email: "",
      phone: "",
      perfection: undefined,
      thumb: "",
		},
		sms:null,
		password:null,
		register:null
};


export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_INFO_SUCCESS:
			return {
				...state,
				userInfo:action.result === null ? INITIAL_STATE.userInfo : action.result
			};
		case MOBILE_SEND_SUCCESS:
			return {
				...state,
				sms:action.result
			};
		case USER_FORGOTPASSWORD_SUCCESS:
			return {
				...state,
				password:action.result
			};
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				register:action.result
			};
		case UPUDAE_USER_AVATAR:
			state = fromJS(state)
			return state.setIn(['userInfo', 'thumb'], action.payload).toJS();
		default:
			return state;
	}
};
