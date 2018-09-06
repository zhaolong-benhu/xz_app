/**
 * Created by qzy on 11/04/2017.
 * File description:
 */
import {
	TEST,
	LOGIN_USER_DATA
} from '../actions/types';

const initialState = {
	text:'',
	number:1,
	data:[]
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TEST:
			return {
				...state,
				text:action.payload
			}
		case LOGIN_USER_DATA:
		  return {
				...state,
				data: action.data
			}
		default:
			return state;
	}
};
