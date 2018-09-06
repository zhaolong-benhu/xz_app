/**
 * Created by same on 21/04/2017.
 * File description:
 */
import {
  LOADING_START,
  LOADING_END,
} from '../actions/types';
const INITIAL_STATE = {
	loading:false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOADING_START:
			return {
				...state,
				loading:true
			};
		case LOADING_END:
			return {
				...state,
				loading:false
			};
		default:
			return state;
	}
};
