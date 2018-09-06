/**
 * Created by qzy on 28/04/2017.
 * File description:
 */
import {
	STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS,
	STUDY_COURSEDETAIL_TOGGLE_CATEGORY,
	STUDY_COURSEDETAIL_TOGGLE_PROGRESS,
	STUDY_COURSEDETAIL_CHOOSE_CATEGORY,
	STUDY_COURSEDETAIL_CHOOSE_PROGRESS,
} from '../actions/types';
import { fromJS, } from 'immutable';
import _ from 'lodash'
const INITIAL_STATE = {
	category: undefined,
	toggleCategory: false,
	toggleProgress: false,
	choosedProgressID: undefined,
	choosedProgressName: null,
	choosedCategoryID: undefined,
	choosedCategoryName: null,
};

export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {
		case STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS:
			return state
				.set('category',action.payload.category)
				.set('toggleCategory',false)
				.set('toggleProgress',false)
				.set('choosedProgressID',action.payload.sort)
				.set('choosedCategoryID',action.payload.lecture_id)
				.toJS()
		case STUDY_COURSEDETAIL_TOGGLE_CATEGORY:
			return state
				.set('choosedCategoryName',null)
				.set('toggleProgress',false)
				.update('toggleCategory',toggleCategory => !toggleCategory)
				.toJS()
		case STUDY_COURSEDETAIL_TOGGLE_PROGRESS:
			return state.set('choosedProgressName',null)
				.set('toggleCategory',false)
				.update('toggleProgress',toggleProgress => !toggleProgress)
				.toJS()
		case STUDY_COURSEDETAIL_CHOOSE_CATEGORY:
			if(action.payload === 0 ) {
				return state
					.set('choosedCategoryID',0)
					.set('choosedCategoryName',null)
					.set('toggleCategory',false)
					.toJS()
			}
			const index = _.findIndex(state.toJS().category, category => category.id === action.payload)
			const name = state.getIn(['category',index,'name'])
			return state
				.set('choosedCategoryID',action.payload)
				.set('choosedCategoryName',name)
				.set('toggleCategory',false)
				.toJS()
		case STUDY_COURSEDETAIL_CHOOSE_PROGRESS:
			let choosedProgressName = ['默认','降序','升序']
			return state
				.set('choosedProgressID', action.payload)
				.set('choosedProgressName', choosedProgressName[action.payload])
				.set('toggleProgress',false)
				.toJS()
		default:
			return vanillaState;
	}
};