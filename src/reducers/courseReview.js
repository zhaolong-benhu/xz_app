/**
 * Created by qzy on 03/05/2017.
 * File description:
 */
import {
	STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS,
	STUDY_COURSEDETAIL_ADD_REVIEW,
} from '../actions/types';
import { fromJS, } from 'immutable';
const INITIAL_STATE = {
	star: 0,
	description:'',
	editable: false
};

export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {

		case STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS:
			if(action.payload.review){//排除ihma没有评论数据
				if(Array.isArray(action.payload.review)) {
					return state
						.set('star',0)
						.set('description','')
						.set('editable', true).toJS()
				}else{
					return state
						.set('star',action.payload.review.star)
						.set('description',action.payload.review.description)
						.set('editable',false)
						.toJS();
				}
			}

		case STUDY_COURSEDETAIL_ADD_REVIEW:
			if(action.payload.editable) {
				return state
					.set('star', action.payload.rating)
					.set('description', action.payload.description)
					.set('editable', action.payload.editable)
					.toJS();
			}
			return state
				.set('star', action.payload.rating)
				.set('description', action.payload.description)
				.toJS();

		default:
			return vanillaState;
	}
};