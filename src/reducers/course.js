/**
 * Created by qzy on 28/04/2017.
 * File description:
 */
import {
	STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS,
	STUDY_COURSEDETAIL_TOGGLE_OPENSTATE,
	STUDY_COURSEDETAIL_BACK_AND_REFRESH,
  REFRESH_FALSE,
} from '../actions/types';
import { fromJS, } from 'immutable';
import _ from 'lodash'
const INITIAL_STATE = {
	coursePackage: undefined,
	percent: 0,
	refresh: false
};

export default (state = INITIAL_STATE, action) => {
  const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {
		case STUDY_COURSEDETAIL_GET_DETAIL_SUCCESS:
			let percent = 0
			if( !action.payload.lecture_id && !action.payload.sort){
				//算完成的百分比
				const process = action.payload.detail.course_info
					.map( course => course.progress.learn_rate)
					.reduce((acc, curVal) => parseInt(acc) + parseInt(curVal), 0)
				percent = Math.floor(process / action.payload.detail.course_info.length)
			}

			//为每一门课程添加打开或关闭状态，根据它现在learn_rate决定
			const detail = fromJS(action.payload.detail)
				.update('course_info',course_info => course_info
					.map(listing => listing
						.update('openState',openState => {
							if(listing.getIn(['progress','learn_rate']) >= 10 && listing.getIn(['progress','learn_rate']) < 80) {
								return true
							}
							return false
						}
				)))
			if( !action.payload.lecture_id && !action.payload.sort) {
				return state
					.set('coursePackage', detail)
					.set('percent',percent)
					.set('refresh',false)
					.toJS();
			}
			return state
				.set('coursePackage', detail)
				.toJS();
		case STUDY_COURSEDETAIL_TOGGLE_OPENSTATE:
			//查找index
			const index = _.findIndex(state.toJS().coursePackage.course_info, course_info => course_info.course.id === action.payload )
			return state.updateIn(['coursePackage','course_info',index, 'openState'], openState => !openState).toJS()
		case STUDY_COURSEDETAIL_BACK_AND_REFRESH:
			return state.set('refresh',true).toJS()
		case REFRESH_FALSE:
			return state.set('refresh',false).toJS()
		default:
			return vanillaState;
	}
};