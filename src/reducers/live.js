/**
 * Created by qzy on 18/04/2017.
 * File description:直播
 */
import {
	LIVE_LIVECAST_GET,
	LIVE_LIVECAST_GET_FAIL,
	LIVE_LIVECAST_GET_SUCCESS,
	LIVE_LIVECAST_ADD_REMIND_SUCCESS,
	LIVE_LIVECAST_ADD_REMIND_FAIL,
	LIVE_LIVECAST_DELETE_REMIND_SUCCESS,
	LIVE_LIVECAST_DELETE_REMIND_FAIL,
  LIVE_LIVECAST_ADD_FAVORITE_SUCCESS,
  LIVE_LIVECAST_DELETE_FAVORITE_SUCCESS,
  LIVE_LIVECAST_LIVECAST_CLEAR_LIVE_LIST,
} from '../actions/types';
import _ from 'lodash';
import { fromJS, toJS } from 'immutable';
const INITIAL_STATE = {
	listLoading: false,
	liveLists: [],
	error:'',
  total_page:0,
  total_num:0,
  current_page:1,
  page_size:0,
};
let index = 0

const findIndex = (id, state) => {
	return _.findIndex(state, arr => arr.id === id )
}
export default (state = INITIAL_STATE, action) => {
	const vanillaState = state;
	state = fromJS(state)
	switch (action.type) {

		case LIVE_LIVECAST_GET:
			return state
								.set('listLoading', true)
								.toJS()
      // 列表数据
		case LIVE_LIVECAST_GET_SUCCESS:
		  const {list, total_page, total_num, current_page, page_size } = action.payload
			return state
							.set('listLoading', false)
							.set('total_page',total_page )
							.set('total_num', total_num)
							.set('current_page', current_page)
							.set('page_size', page_size)
							.update('liveLists', liveLists => {
							  // debugger
							  return _.union(liveLists.toJS(), list)
              })
							.toJS()
		case LIVE_LIVECAST_GET_FAIL:
			return state
				.set('listLoading', false)
				.set('error', action.payload)
				.toJS()
		//添加提醒
		case LIVE_LIVECAST_ADD_REMIND_SUCCESS:
			index = findIndex(action.payload, state.toJS().liveLists)
			return state
							.setIn(['liveLists', index, 'remind'], 1)
							.toJS()

		case LIVE_LIVECAST_ADD_REMIND_FAIL:
			return state.toJS();
		//删除提醒
		case LIVE_LIVECAST_DELETE_REMIND_SUCCESS:
			index = findIndex(action.payload,  state.toJS().liveLists)
			return state
							.setIn(['liveLists', index, 'remind'], 0)
							.toJS()

		case LIVE_LIVECAST_DELETE_REMIND_FAIL:
			return state.toJS();
// 添加关注
    case LIVE_LIVECAST_ADD_FAVORITE_SUCCESS:
      index = findIndex(action.payload, state.toJS().liveLists)
      return state
          .setIn(['liveLists', index, 'favorite'], 0)
          .toJS()
// 删除关注
    case LIVE_LIVECAST_DELETE_FAVORITE_SUCCESS:
      index = findIndex(action.payload, state.toJS().liveLists)
      return state
          .setIn(['liveLists', index, 'favorite'], 1)
          .toJS()
		//刷新清空列表
		case LIVE_LIVECAST_LIVECAST_CLEAR_LIVE_LIST:
			return state
              .set('total_page',0)
              .set('total_num',0)
              .set('current_page',1)
              .set('page_size',0)
              .set('liveLists',[])
              .toJS();
    default:
			return vanillaState;
	}
};
