/**
 * Created by qzy on 07/05/2017.
 * File description:
 */
import {
	STUDY_COURSEDETAIL_GET_EXAM_QUESTIONS_SUCCESS,
	STUDY_COURSEDETAIL_CHOOSE_EXAM_QUESTIONS,
  STUDY_EXAM_PREV_QUESTION,
  STUDY_EXAM_NEXT_QUESTION,
  STUDY_EXAM_RESET_QUESTION,
} from '../actions/types';
import { fromJS, Set } from 'immutable';
import _ from 'lodash'
const INITIAL_STATE = {
	examQuestions: undefined,
	total:0,
  nowQuestionNum:0,
};

export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {
		case STUDY_COURSEDETAIL_GET_EXAM_QUESTIONS_SUCCESS:
			//所有题目添加myAnswer数组
			const addedAnswer = action.payload.map(question => {
				question.myAnswer = []
				return question
			})
			return state
							.set('examQuestions',addedAnswer)
							.set('total',action.payload.length)
              .set('nowQuestionNum', 0)
							.toJS()
		case STUDY_COURSEDETAIL_CHOOSE_EXAM_QUESTIONS:
      const type = action.payload.type;
      const id = action.payload.id + 1;
			//添加或删除是否存在答案
			let updated
			const settedAnswer = Set(state
				.getIn(['examQuestions',action.payload.examNum,'myAnswer']))

			if(type == 1) {
				updated = settedAnswer.clear().add(id)
			} else {
				if(settedAnswer.has(id)){
					updated = settedAnswer.delete(id)
				}else{
					updated = settedAnswer.add(id)
				}
			}

			return state
				.setIn(['examQuestions',action.payload.examNum,'myAnswer'],updated)
				.toJS()

		case STUDY_EXAM_PREV_QUESTION:
			return state
					.update('nowQuestionNum', nowQuestionNum=>nowQuestionNum-1)
					.toJS();
    case STUDY_EXAM_NEXT_QUESTION:
      return state
          .update('nowQuestionNum', nowQuestionNum=>nowQuestionNum+1)
		      .toJS();
    case STUDY_EXAM_RESET_QUESTION:
      return state
          .set('nowQuestionNum', 0)
		      .toJS();
		default:
			return vanillaState;
	}
}
