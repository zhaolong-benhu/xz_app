/**
 * Created by qzy on 08/05/2017.
 * File description:
 */
/**
 * Created by qzy on 07/05/2017.
 * File description:
 */
import {
	STUDY_COURSEDETAIL_SAVE_EXAM_QUESTIONS_SUCCESS,
  STUDY_COURSEDETAIL_GET_EXAM_QUESTIONS_SUCCESS,
} from '../actions/types';
import { fromJS, Set } from 'immutable';
import _ from 'lodash'
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {
		case STUDY_COURSEDETAIL_GET_EXAM_QUESTIONS_SUCCESS:
      return state.clear().toJS();
		case STUDY_COURSEDETAIL_SAVE_EXAM_QUESTIONS_SUCCESS:
			return state.clear().merge(action.payload).toJS()
		default:
			return vanillaState;
	}
}